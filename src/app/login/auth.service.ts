import { Injectable } from '@angular/core';
import { Login, User } from '../shared/models/user/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

interface AuthResponse {
  idToken: string,
  expiresIn: number
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  environment = environment;
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());
  constructor(private http: HttpClient) { }

  loginSubmit(login: Login) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.environment.api + '/users/login', login).pipe(
      tap(res => { this.setSession(res) }),
      shareReplay()
    );
  }
  
  private setSession(authResult: AuthResponse) {
    const expiresAt = moment().add(authResult.expiresIn,'seconds');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.isUserLoggedIn.next(this.isLoggedIn());
  }
  
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.isUserLoggedIn.next(this.isLoggedIn());
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }
  
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = expiration ? JSON.parse(expiration) : undefined;
    return moment(expiresAt);
  }

  registerSubmit(registration: any) {
    return this.http.post(this.environment.api + '/users', registration).pipe(
      map(authResponse => {
        this.setSession(authResponse as AuthResponse)
      })
    );
  }
  
  updateUser(user: User) {
    return this.http.put(this.environment.api + '/users/' + user.id, user);
  }
}