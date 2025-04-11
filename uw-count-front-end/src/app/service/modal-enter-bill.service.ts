import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEnterBillService {

  isModalOpen = new EventEmitter<boolean>();
  
}
