import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalReceivePaymentService {
  isReceivePaymentOpen = new EventEmitter<boolean>();
    
}
