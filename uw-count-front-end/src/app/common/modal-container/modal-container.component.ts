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
import { ChartOfAccountsService } from '../../service/chart-of-accounts.service';
import { ChartOfAccountsComponent } from "../../page/company/chart-of-accounts/chart-of-accounts.component";
import { ProfitAndLossComponent } from "../../page/reports/profit-and-loss/profit-and-loss.component";
import { ReportsService } from '../../service/reports.service';

@Component({
  selector: 'app-modal-container',
  imports: [EnterBillComponent, PayBillComponent, CreateInvoiceComponent, ReceivePaymentComponent, AddVendorComponent, ChartOfAccountsComponent, ProfitAndLossComponent],
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
  isChartOfAccountsOpen: boolean = false;
  isProfitAndLossOpen: boolean = false;
  
  
  private enterBillSubscription!: Subscription;
  private payBillSubscription!: Subscription;
  private createInvoiceSubscription!: Subscription;
  private receivePaymentSubscription!: Subscription;
  private addSupplierSubscription!: Subscription;
  private chartOfAccountsSubscription!: Subscription;
  private profitAndLossSubscription!: Subscription;


  constructor(private modalEnterBillService: ModalEnterBillService, private modalPayBillService: ModalPayBillService, private modalCreateInvoiceService: ModalCreateInvoiceService, private modalReceivePaymentService: ModalReceivePaymentService, private supplierService: SupplierService, private chartOfAccountsService: ChartOfAccountsService, private reportService: ReportsService) {}

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
    this.chartOfAccountsSubscription = this.chartOfAccountsService.isChartOfAccountsOpen.subscribe(
      (isChartOfAccountsOpen: boolean) => {
        this.isChartOfAccountsOpen = isChartOfAccountsOpen;
      }
    );
    this.profitAndLossSubscription = this.reportService.isProfitAndLossOpen.subscribe(
      (isProfitAndLossOpen: boolean) => {
        this.isProfitAndLossOpen = isProfitAndLossOpen
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.enterBillSubscription.unsubscribe();
    this.payBillSubscription.unsubscribe();
    this.createInvoiceSubscription.unsubscribe();
    this.receivePaymentSubscription.unsubscribe();
    this.addSupplierSubscription.unsubscribe();
    this.chartOfAccountsSubscription.unsubscribe();
    this.profitAndLossSubscription.unsubscribe();
  }



}
