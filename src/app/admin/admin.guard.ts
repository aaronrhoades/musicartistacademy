import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService, PermissionLevels } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let urlTree = this.router.parseUrl('unauthorized');
      let token = this.authService.getCurrentUserTokenClient();
      if (!token?.permissionLevel){
        return of(urlTree);
      }

      let permissionArray = (token.permissionLevel as Array<string>);
      if (permissionArray.includes(PermissionLevels.Teacher) || permissionArray.includes(PermissionLevels.System))
        return true;
      else { 
        return of(urlTree)
      }
  }
}
