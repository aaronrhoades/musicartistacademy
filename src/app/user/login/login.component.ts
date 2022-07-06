import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/user/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() container: boolean = true;
  public login: Login = new Login();
  errors: string[] = [];
  public changedSinceLastSubmit: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: new FormControl('',
    {
      validators:[Validators.required, Validators.email]
    }),
    password: new FormControl('',[Validators.required])
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.errors = this.authService.errors.getValue();

    this.loginForm.valueChanges.subscribe({next: res => {
      this.authService.errors.next([]);
      this.errors = [];
      this.changedSinceLastSubmit = true;
    }});
  }

  ngOnDestroy(): void {
    this.authService.errors.next([]); 
  }

  showErrorsWhenInvalid() {
    this.errors = [];
    this.loginForm.markAllAsTouched();
  }

  loginSubmit() {
    let urlTree = this.authService.nextPage.value;

    if(this.loginForm.valid && this.changedSinceLastSubmit) {
      this.authService.loginSubmit(this.loginForm.value as Login)
        .subscribe({
          next: (response) => {
            this.authService.errors.next([]);
            if(response.idToken) {
              if (urlTree) {
                this.router.navigate(urlTree);
                return
              }
              this.router.navigate(['/dashboard']);
            }
          },
          error: err => {
            if (err.error && err.status === 0) {
              this.errors = ['Sorry, there was an error communicating with the server']
            } else {
              this.errors = [err.error];
            }
          }
        });
    } else {
      this.changedSinceLastSubmit = false;
    }
    this.loginForm.markAllAsTouched();
  }
}