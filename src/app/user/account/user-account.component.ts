import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
type UserAcountPage = 'settings' | 'billing';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  private currentStepBs: BehaviorSubject<UserAcountPage> = new BehaviorSubject<UserAcountPage>('settings');
  public currentStep$: Observable<UserAcountPage> = this.currentStepBs.asObservable();
  public userForm: FormGroup = this.fb.group({
    settings: null,
    billing: null
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
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
  }

  setPageFromRoute(){
    let accountPage = (this.route.snapshot.paramMap.get('page') as UserAcountPage);
    if (accountPage) {
      this.currentStepBs.next(accountPage);
    }
  }

}
