import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateInvoiceService {

  isCreateInvoiceOpen = new EventEmitter<boolean>();

}
