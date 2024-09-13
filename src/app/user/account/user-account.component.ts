import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user/user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
type UserAcountPage = 'settings' | 'billing';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  private currentStepBs: BehaviorSubject<UserAcountPage> = new BehaviorSubject<UserAcountPage>('settings');
  public currentStep$: Observable<UserAcountPage> = this.currentStepBs.asObservable();
  userInfo: User = new User();

  public userForm: UntypedFormGroup = this.fb.group({
    settings: null,
    billing: null
  });

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setPageFromRoute();

    this.router.events.subscribe({
      next: e => {
        let routeEvent = e as RouterEvent
        if (routeEvent instanceof NavigationEnd)
        this.setPageFromRoute();
      }
    })

    this.userService.getFullCurrentUser().subscribe({
      next: res => {
        this.userInfo = res;
      }
    });
  }

  setPageFromRoute(){
    let accountPage = (this.route.snapshot.paramMap.get('page') as UserAcountPage);
    if (accountPage) {
      this.currentStepBs.next(accountPage);
    }
  }

  saveAll(){

  }

}
