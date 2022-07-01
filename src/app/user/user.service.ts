import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountInfo, User } from '../shared/models/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getFullCurrentUser(): Observable<User> {
    return this.http.get(environment.api + '/users/user-from-token').pipe(
      mergeMap(resultA => {
        return combineLatest([
          of(resultA),
          this.getAccountInfo(resultA as User)
        ])
      }),
      map(([resultA, resultB]) => {
        return {...resultA, accountInfo: resultB} as User
      })
    );
  }
  getAccountInfo(user: User) {
    return this.http.get(environment.api + '/users/account-info/' + user._id);
  }
  getStripeInfo(){

  }
  updateUser(user: User) {
    return this.http.put(environment.api + '/users/' + user._id, user);
  }
  updateUserInfo(userId: string, accountInfo: AccountInfo) {
    return this.http.put(environment.api + '/users/account-info/' + userId, accountInfo);
  }
}
