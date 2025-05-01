import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEnterBillService {

  isEnterBillsOpen = new EventEmitter<boolean>();

  isAddSupplierOpen = new EventEmitter<boolean>();

  supplierName: string = "";
  
}
