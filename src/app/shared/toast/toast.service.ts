import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastLimit = 4;
  toastMessages: ReplaySubject<string> = new ReplaySubject(this.toastLimit);
  
  constructor() { 
    this.toastMessages.subscribe({next: res => {console.log(res)}});
  }

  newToast(message: string) {
    this.toastMessages.next(message);
  }
}
