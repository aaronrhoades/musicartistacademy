import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, StateAbbreviations } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public readonly states: string[] = StateAbbreviations;
  public registration: User = new User();
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
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

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
  } 
}
