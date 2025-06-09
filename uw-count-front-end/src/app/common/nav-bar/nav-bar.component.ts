import { Component } from '@angular/core';
import { ModalEnterBillService } from '../../service/modal-enter-bill.service';
import { ModalPayBillService } from '../../service/modal-pay-bill.service';
import { ModalCreateInvoiceService } from '../../service/modal-create-invoice.service';
import { ModalReceivePaymentService } from '../../service/modal-receive-payment.service';
import { SupplierService } from '../../service/supplier.service';
import { ChartOfAccountsService } from '../../service/chart-of-accounts.service';
import { ReportsService } from '../../service/reports.service';
import { JournalEntryService } from '../../service/journal-entry.service';
import { ProductService } from '../../service/product.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(
    private readonly enterBillModalService: ModalEnterBillService, 
    private readonly payBillModalService: ModalPayBillService, 
    private readonly createInvoiceService: ModalCreateInvoiceService, 
    private readonly receivePaymentService: ModalReceivePaymentService, 
    private readonly supplierService: SupplierService, 
    private readonly chartOfAccountsService: ChartOfAccountsService, 
    private readonly reportService: ReportsService, 
    private readonly jEService: JournalEntryService, 
    private readonly productService: ProductService, 
    private readonly customerService: CustomerService
  ) {}
  
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
    this.supplierService.isAddSupplierOpen.emit(true);
  }

  openChartOfAccountsModal(): void {
    this.chartOfAccountsService.isChartOfAccountsOpen.emit(true);
  }

  openProfitAndLoss(): void {
    this.reportService.isProfitAndLossOpen.emit(true);
  }

  openBalanceSheet(): void {
    this.reportService.isBalanceSheetOpen.emit(true);
  }

  openJournalEntry(): void {
    this.jEService.isJournalEntryOpen.emit(true);
  }

  openProducts(): void {
    this.productService.isProductsOpen.emit(true);
  }

  openAddCustomer(): void {
    this.customerService.isCustomersOpen.emit(true);
  }

}

