import { Injectable } from '@angular/core';
import { Login } from '../shared/models/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export class LoginResponse {
  success: boolean = false; 
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  environment = environment;

  constructor(private http: HttpClient) { }

  loginSubmit(login: Login) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.environment + '/login', login);
  }
}
