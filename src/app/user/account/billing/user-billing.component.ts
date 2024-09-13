import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-user-billing',
  templateUrl: './user-billing.component.html',
  styleUrls: ['./user-billing.component.scss']
})
export class UserBillingComponent implements OnInit {
  // @Output() subformInitialized: EventEmitter = new EventEmitter();

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    
  }

}
