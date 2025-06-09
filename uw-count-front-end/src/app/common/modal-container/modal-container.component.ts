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
import { BalanceSheetComponent } from '../../page/reports/balance-sheet/balance-sheet.component';
import { JournalEntryService } from '../../service/journal-entry.service';
import { JournalEntryComponent } from "../../page/company/journal-entry/journal-entry.component";
import { ProductService } from '../../service/product.service';
import { ProductComponent } from "../../page/company/product/product.component";
import { CustomerService } from '../../service/customer.service';
import { CustomerListComponent } from "../../page/customer/customer-list/customer-list.component";

@Component({
  selector: 'app-modal-container',
  imports: [EnterBillComponent, PayBillComponent, CreateInvoiceComponent, ReceivePaymentComponent, AddVendorComponent, ChartOfAccountsComponent, ProfitAndLossComponent, BalanceSheetComponent, JournalEntryComponent, ProductComponent, CustomerListComponent],
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
  isBalanceSheetOpen: boolean = false;
  isJournalEntryOpen: boolean = false;
  isProductsOpen: boolean = false;
  isCustomerOpen: boolean = false;
  
  private enterBillSubscription!: Subscription;
  private payBillSubscription!: Subscription;
  private createInvoiceSubscription!: Subscription;
  private receivePaymentSubscription!: Subscription;
  private addSupplierSubscription!: Subscription;
  private chartOfAccountsSubscription!: Subscription;
  private profitAndLossSubscription!: Subscription;
  private balanceSheetSubscription!: Subscription;
  private journalEntrySubscription!: Subscription;
  private productsSubscription!: Subscription;
  private customerSubscription!: Subscription;

  constructor(
    private readonly modalEnterBillService: ModalEnterBillService, 
    private readonly modalPayBillService: ModalPayBillService, 
    private readonly modalCreateInvoiceService: ModalCreateInvoiceService, 
    private readonly modalReceivePaymentService: ModalReceivePaymentService, 
    private readonly supplierService: SupplierService, 
    private readonly chartOfAccountsService: ChartOfAccountsService, 
    private readonly reportService: ReportsService, 
    private readonly jeService: JournalEntryService, 
    private readonly productService: ProductService,
    private readonly customerService: CustomerService
  ) {}

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
        this.isProfitAndLossOpen = isProfitAndLossOpen;
      }
    );
    this.balanceSheetSubscription = this.reportService.isBalanceSheetOpen.subscribe(
      (isBalanceSheetOpen: boolean) => {
        this.isBalanceSheetOpen = isBalanceSheetOpen;
      }
    );
    this.journalEntrySubscription = this.jeService.isJournalEntryOpen.subscribe(
      (isJournalEntryOpen: boolean) => {
        this.isJournalEntryOpen = isJournalEntryOpen;
      }
    );
    this.productsSubscription = this.productService.isProductsOpen.subscribe(
      (isProductsOpen: boolean) => {
        this.isProductsOpen = isProductsOpen;
      }
    );
    this.customerSubscription = this.customerService.isCustomersOpen.subscribe(
      (isCustomerOpen: boolean) => {
        this.isCustomerOpen = isCustomerOpen;
      }
    );
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
    this.balanceSheetSubscription.unsubscribe();
    this.journalEntrySubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();
  }
}
