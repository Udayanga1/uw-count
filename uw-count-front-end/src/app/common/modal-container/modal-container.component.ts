import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { EnterBillComponent } from "../../page/vendor/enter-bill/enter-bill.component";
import { Subscription } from 'rxjs';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';
import { PayBillComponent } from "../../page/vendor/pay-bill/pay-bill.component";
import { CreateInvoiceComponent } from "../../page/customer/create-invoice/create-invoice.component";
import { ModalCreateInvoiceService } from '../../service/modal-create-invoice.service';
import { ModalReceivePaymentService } from '../../service/modal-receive-payment.service';
import { ReceivePaymentComponent } from "../../page/customer/receive-payment/receive-payment.component";
import { AddVendorComponent } from "../../page/vendor/add-vendor/add-vendor.component";
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-modal-container',
  imports: [EnterBillComponent, PayBillComponent, CreateInvoiceComponent, ReceivePaymentComponent, AddVendorComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})

export class ModalContainerComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  
  isEnterBillsOpen: boolean = false;
  isPayBillsOpen: boolean = false;
  isCreateInvoiceOpen: boolean = false;
  isReceivePaymentOpen: boolean = false;
  isAddSupplier: boolean = false;
  
  private enterBillSubscription!: Subscription;
  private payBillSubscription!: Subscription;
  private createInvoiceSubscription!: Subscription;
  private receivePaymentSubscription!: Subscription;
  private addSupplierSubscription!: Subscription;


  constructor(private modalEnterBillService: ModalEnterBillService, private modalPayBillService: ModalPayBillService, private modalCreateInvoiceService: ModalCreateInvoiceService, private modalReceivePaymentService: ModalReceivePaymentService, private supplierService: SupplierService) {}

  ngOnInit(): void {
    // Subscribe to modal state changes
    this.enterBillSubscription = this.modalEnterBillService.isEnterBillsOpen.subscribe(
      (isEnterBillsOpen: boolean) => {
        this.isEnterBillsOpen = isEnterBillsOpen;
      }
    );
    this.addSupplierSubscription = this.supplierService.isAddSupplierOpen.subscribe(
      (isAddSupplier: boolean) => {
        this.isAddSupplier = isAddSupplier;
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
    );
    this.receivePaymentSubscription = this.modalReceivePaymentService.isReceivePaymentOpen.subscribe(
      (isReceivePaymentOpen: boolean) => {
        this.isReceivePaymentOpen = isReceivePaymentOpen;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.enterBillSubscription.unsubscribe();
    this.payBillSubscription.unsubscribe();
    this.createInvoiceSubscription.unsubscribe();
    this.receivePaymentSubscription.unsubscribe();
  }



}
