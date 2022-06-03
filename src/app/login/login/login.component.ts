import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/user/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  constructor(private loginService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe({next: res => {
      this.errors = [];
      this.changedSinceLastSubmit = true;
    }});
  }
  showErrorsWhenInvalid() {
    this.errors = [];
    this.loginForm.markAllAsTouched();
  }
  loginSubmit() {
    if(this.loginForm.valid && this.changedSinceLastSubmit) {
      this.loginService.loginSubmit(this.loginForm.value as Login)
        .subscribe({
          next: (response) => {
            if(response.idToken) {
              this.router.navigate(['/dashboard']);
            }
          },
          error: err => {
            this.errors = [err.error];
          }
        });
    } else {
      this.changedSinceLastSubmit = false;
    }
  }
}
