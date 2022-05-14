import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/user/user';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: Login = new Login();
  public loginForm: FormGroup = new FormGroup({
    emailUser: new FormControl(),
    password: new FormControl()
  });

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.loginService.loginSubmit(this.loginForm.value as Login).subscribe(
      {
        next: (response) => {
          if(response.success)
            this.router.navigate(['/dashboard']);
        },
        error: err => console.log(err)
      });
  }
}
