import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { User, StateAbbreviations } from 'src/app/shared/models/user/user';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {
  @Input() user: User = new User();
  @Input() newUser: boolean = true;
  changePassword: boolean = false;
  passwordMinLength: number = 6;
  passwordFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(this.passwordMinLength)]);
  errors: string[] = [];
  public changedSinceLastSubmit: boolean = true; //helps prevent multiple invalid calls to server
  public readonly states: string[] = StateAbbreviations;
  public registration: User = new User();
  public registerForm: FormGroup = this.fb.group({
    email: new FormControl(
      '',
      {
        validators: [Validators.required, Validators.email]
        //,updateOn: 'blur'
      }),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(),
    phone: new FormControl(),
    mailingAddress: new FormGroup({
      addressLine1: new FormControl(),
      addressLine2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl()
    }),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    if(this.newUser)
      this.registerForm.addControl('password', this.passwordFormControl);
    this.registerForm.valueChanges.subscribe({next: res => {
      this.changedSinceLastSubmit = true;
      this.clearErrors();
    }})
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(changes['user']) {
      this.registerForm.patchValue(this.user);
    }
  }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get firstName() { return this.registerForm.get('firstName'); }

  showErrorsWhenInvalid() {
    this.clearErrors();
    this.registerForm.markAllAsTouched();
    if(!this.registerForm.valid) {
      this.errors.push("Invalid form fields, please check validation messages above.");
    }
  }
  clearErrors(){
    this.errors = [];
  }
  onSubmit() {
    if(this.registerForm.valid && this.changedSinceLastSubmit) {
      this.changedSinceLastSubmit = false;
      this.submitUser();
    }
  }
  toggleChangePassword(changePassword: boolean) {
    this.changePassword = changePassword;
    this.user.password = '';
    if(!changePassword) {
      this.registerForm.removeControl('password');
    } else {
      this.registerForm.addControl('password', this.passwordFormControl);

      timer(50).subscribe({ next: () => {
        let pw: HTMLInputElement = document.querySelector('#password') as HTMLInputElement;
        console.log(pw);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        
        if (pw) pw.focus();
      }})
    }
  }
  submitUser(){
    if(!this.user._id && this.newUser) {
      this.authService.registerSubmit(this.registerForm.value).subscribe({
        error: err => {
          this.clearErrors();
          if(err.error)
          this.errors.push(err.error)
        },
        complete: () => {
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.userService.updateUser(this.registerForm.value).subscribe({
        next: res => {
          this.toastService.newToast('Account information updated successfully');
        },
        error: err => console.log(err)
      });
    }
  }
}
