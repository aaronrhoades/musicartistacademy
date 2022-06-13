import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {
  @Input() errors: Array<string> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
