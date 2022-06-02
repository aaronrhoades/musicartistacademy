import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, StateAbbreviations } from 'src/app/shared/models/user/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() user: User = new User();
  passwordMinLength: number = 6;
  errors: string[] = [];
  private changedSinceLastSubmit: boolean = true; //helps prevent multiple invalid calls to server
  public readonly states: string[] = StateAbbreviations;
  public registration: User = new User();
  public registerForm: FormGroup = this.fb.group({
    email: new FormControl(
      '',
      {
        validators: [Validators.required, Validators.email]
        //,updateOn: 'blur'
      }),
    password: new FormControl('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
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

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe({next: res => {
      this.changedSinceLastSubmit = true;
      this.clearErrors();
    }})
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
  submitUser(){
    if(!this.user.id) {
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
      this.authService.updateUser(this.registerForm.value).subscribe({
        next: res => {console.log(res)},
        error: err => console.log(err)
      });
    }
  }
}
