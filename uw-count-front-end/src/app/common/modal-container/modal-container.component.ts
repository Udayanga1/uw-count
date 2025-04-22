import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnterBillComponent } from "../../page/vendor/enter-bill/enter-bill.component";
import { Subscription } from 'rxjs';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';
import { PayBillComponent } from "../../page/vendor/pay-bill/pay-bill.component";
import { CreateInvoiceComponent } from "../../page/customer/create-invoice/create-invoice.component";
import { ModalCreateInvoiceService } from '../../service/modal-create-invoice.service';

@Component({
  selector: 'app-modal-container',
  imports: [EnterBillComponent, PayBillComponent, CreateInvoiceComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})

export class ModalContainerComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  
  isEnterBillsOpen: boolean = false;
  isPayBillsOpen: boolean = false;
  isCreateInvoiceOpen: boolean = false;
  
  private enterBillSubscription!: Subscription;
  private payBillSubscription!: Subscription;
  private createInvoiceSubscription!: Subscription;

  constructor(private modalEnterBillService: ModalEnterBillService, private modalPayBillService: ModalPayBillService, private modalCreateInvoiceService: ModalCreateInvoiceService) {}

  ngOnInit(): void {
    // Subscribe to modal state changes
    this.enterBillSubscription = this.modalEnterBillService.isEnterBillsOpen.subscribe(
      (isEnterBillsOpen: boolean) => {
        this.isEnterBillsOpen = isEnterBillsOpen;
      }
    );
    this.payBillSubscription = this.modalPayBillService.isPayBillsOpen.subscribe(
      (isPayBillsOpen: boolean) => {
        this.isPayBillsOpen = isPayBillsOpen;
      }
    );
    this.createInvoiceSubscription = this.modalCreateInvoiceService.isCreateInvoiceOpen.subscribe(
      (isCreateInvoiceOpen: boolean) => {
        this.isCreateInvoiceOpen = isCreateInvoiceOpen;
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.enterBillSubscription.unsubscribe();
    this.payBillSubscription.unsubscribe();
  }

}
