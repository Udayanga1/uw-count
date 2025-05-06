import { Component } from '@angular/core';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';
import { ModalCreateInvoiceService } from '../../service/modal-create-invoice.service';
import { ModalReceivePaymentService } from '../../service/modal-receive-payment.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private enterBillModalService: ModalEnterBillService, private payBillModalService: ModalPayBillService, private createInvoiceService: ModalCreateInvoiceService, private receivePaymentService: ModalReceivePaymentService) {}
  
  openEnterBillModal(): void {
    this.enterBillModalService.isEnterBillsOpen.emit(true);    
  }

  openPayBillModal(): void {
    this.payBillModalService.isPayBillsOpen.emit(true);
  }

  openCreateInvoiceModal(): void {
    this.createInvoiceService.isCreateInvoiceOpen.emit(true);
  }

  openReceivePaymentModal(): void {
    this.receivePaymentService.isReceivePaymentOpen.emit(true);
  }

  openAddSupplierModal(): void {
    this.enterBillModalService.isAddSupplierOpen.emit(true);
  }

}
