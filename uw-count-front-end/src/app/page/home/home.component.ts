import { Component } from '@angular/core';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';
import { ModalCreateInvoiceService } from '../../service/modal-create-invoice.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private enterBillModalService: ModalEnterBillService, private payBillModalService: ModalPayBillService, private createInvoiceService: ModalCreateInvoiceService) {}

  openEnterBillModal(): void {
    this.enterBillModalService.isEnterBillsOpen.emit(true);    
  }

  openPayBillModal(): void {
    this.payBillModalService.isPayBillsOpen.emit(true);
  }

  openCreateInvoiceModal(): void {
    console.log("openCreateInvoiceModal()");
    this.createInvoiceService.isCreateInvoiceOpen.emit(true);
  }
}
