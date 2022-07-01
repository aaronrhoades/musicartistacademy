import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastLimit = 4;
  toastMessages: ReplaySubject<string> = new ReplaySubject(this.toastLimit);
  
  constructor() { 
  }

  newToast(message: string) {
    this.toastMessages.next(message);
  }
}
