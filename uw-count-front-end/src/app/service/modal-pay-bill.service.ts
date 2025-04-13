import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalPayBillService {

  isPayBillsOpen = new EventEmitter<boolean>();
  
}
