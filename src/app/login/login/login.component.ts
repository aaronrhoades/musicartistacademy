import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from 'src/app/shared/models/user/user';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
  } 
}
