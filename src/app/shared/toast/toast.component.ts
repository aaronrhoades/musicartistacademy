import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toastMessages: Array<string> = [];
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastMessages.subscribe({
      next: res => {
        this.toastMessages.push(res);
      }
    })
  }

}