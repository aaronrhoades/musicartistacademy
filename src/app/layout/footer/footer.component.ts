import { Component, OnInit } from '@angular/core';
import { combineLatest, mergeMap, of } from 'rxjs';
import { User } from 'src/app/shared/models/user/user';
import { AuthService, PermissionLevels } from 'src/app/user/auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userInfo: User = new User();
  userHasAdmin: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getFullCurrentUser().subscribe({
      next: res => {
        this.userInfo = res;
        console.log(this.userInfo);
      }
    });
    this.authService.isUserLoggedIn.pipe(
      mergeMap(
        isLoggedIn => {
          let fullCurrentUser$ = isLoggedIn ? this.userService.getFullCurrentUser() : of(new User())
          return combineLatest([of(isLoggedIn), fullCurrentUser$])
        }
      )
    ).subscribe({
      next: res => {
        console.log(res[0]);
        this.isUserLoggedIn = res[0]
        let user = res[1] as User;
        if (user.permissionLevel.indexOf(PermissionLevels.Teacher) >= 0) {
          this.userHasAdmin = true;
        } else {
          this.userHasAdmin = false;
        }
      }
    })
  }
  
}
