import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountInfo } from 'src/app/shared/models/user/user';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnChanges {
  @Input() accountInfo: AccountInfo | null = null;

  subscriptions: FormGroup = this.fb.group({
    personalSummary: [''],
    webApp: [''],
    community: ['']
  });
  form: FormGroup = this.fb.group({
    subscriptions: this.subscriptions,
    subscriptionFreq: ['daily', Validators.required]
  });
  constructor(private fb: FormBuilder, private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    let accountInfoChanges = changes['accountInfo']
    if(accountInfoChanges){
      this.subscriptions.get('personalSummary')?.setValue(this.accountInfo?.subscriptions.personalSummary);
      this.subscriptions.get('webApp')?.setValue(this.accountInfo?.subscriptions.webApp);
      this.subscriptions.get('community')?.setValue(this.accountInfo?.subscriptions.community)
      this.form.get('subscriptionFreq')?.setValue(this.accountInfo?.subscriptionFreq);
    }
  }
  save(){
    if(this.accountInfo){
      this.accountInfo.subscriptions = {
        personalSummary: this.subscriptions.get('personalSummary')?.value,
        webApp: this.subscriptions.get('webApp')?.value,
        community: this.subscriptions.get('community')?.value
      }  
      this.accountInfo.subscriptionFreq = this.form.get('subscriptionFreq')?.value;
      this.userService.updateUserInfo(this.accountInfo.userId, this.accountInfo).subscribe({
        next: res => {
          this.toastService.newToast('Changes saved successfully')
        }
      })
    }
  }
}