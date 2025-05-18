import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalPayBillService } from '../../../service/modal-pay-bill.service';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../models/account';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Bill } from '../../../models/bill';
import { Supplier } from '../../../models/supplier';
import { SupplierService } from '../../../service/supplier.service';

@Component({
  selector: 'app-pay-bill',
  imports: [FormsModule],
  templateUrl: './pay-bill.component.html',
  styleUrl: './pay-bill.component.css'
})


export class PayBillComponent implements OnInit, OnDestroy{
  public isPayBillsOpen: boolean = true;
  private subscription!: Subscription;
  public payDate: string = '';

  public supplier = '';
  public payingAccount = '';
  public paymentMethod = '1';

  invoiceList: Bill[] = [];

  payingAccountList:Account[] = [];

  supplierList: Supplier[] = [];

  total: number = this.invoiceList.length>0 ? this.invoiceList[0].payableBal : 0;

  constructor(private modalService: ModalPayBillService, private coaService: ChartOfAccountsService, private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isPayBillsOpen.subscribe(
      (isPayBillsOpen: boolean) => {
        this.isPayBillsOpen = isPayBillsOpen;
      } 
    );

    const today = new Date();
    this.payDate = today.toISOString().split('T')[0];
    
    this.loadCashAndBankOfAccounts();

    this.supplierService.loadSuppliers().subscribe(suppliers => {
      this.supplierService.supplierList = suppliers;
      
      this.supplierList = suppliers.map(s => s);
    })
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.isPayBillsOpen = false;
  }

  fillPayingAmount(event: any): void {

    let changeAmountPaying: boolean = true;

    const currentRow = event.target.closest('tr');
        
    const invoiceAmount = currentRow.querySelector('.invoice-value');
    const discount = currentRow.querySelector('.discount');
    const amountToPay = currentRow.querySelector('.amount-to-pay');
    const amountPaying = currentRow.querySelector('.amount-paying');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');
    const checkBox = currentRow.querySelector('.form-check-input');

    if(amountPaying.value > 0 && amountToPay.value!=amountPaying.value){
        changeAmountPaying = false;
    }

    const amountToPayValue: number = this.calculateAmountPaying(invoiceAmount.value, discount.value);

    amountToPay.value = amountToPayValue;
    
    if(currentRow.querySelector('.form-check-input').checked) {
      if (changeAmountPaying) {
        amountPaying.value = amountToPayValue;
      }
    } else {
      amountPaying.value = 0;
    }

    this.total = 0;
    payingAmountRows.forEach((row: any) => {
      const value = row.value.length>0 ? parseFloat(row.value) : 0;
      this.total+=value;
    })
  }

  calculateAmountPaying(amountDue: number, discount: number): number {
    return  (amountDue - discount);
  }

  calculateTotal(event: any): void{
    const currentRow = event.target.closest('tr');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');
    const table = currentRow.parentElement.parentElement;
    const totalInput = table.parentElement.querySelector('.total-pay-bill');

    this.total = 0;
    payingAmountRows.forEach((row: any) => {
      const value = row.value.length>0 ? parseFloat(row.value) : 0;
      this.total+=value;
    })

    totalInput.value = this.total;
  }

  payAndNew() {
    this.payAndClose();
    setTimeout(()=>{
      this.isPayBillsOpen = true;
    }, 10);
  }

  payAndClose(){
    if (!this.supplier || !this.payingAccount || this.total <= 0) {
      alert('Please fill supplier, paying account and at least one line item.');
      return;
    }
    this.supplier = '';
    this.invoiceList = [];
    console.log("Paid");
    this.closeModal();
  }

  loadCashAndBankOfAccounts(): void {
    this.payingAccountList = [];
    console.log(this.paymentMethod.valueOf());
    if(this.paymentMethod.valueOf() == "1" ){
      this.coaService.getAccounts().forEach(row=>{
        row.forEach(item=>{
          if (item.type=="Cash and Bank") {
            this.payingAccountList.push(item)
          }
        })
        
      })
    } else if(this.paymentMethod.valueOf() == "2") {
      this.coaService.getAccounts().forEach(row=>{
        row.forEach(item=>{
          if (item.type=="Credit Card") {
            this.payingAccountList.push(item)
          }
        })
      })
    }
  }

  loadSupplierInvoices(supplierName: string): void {
    this.modalService.getSupplierBills(supplierName).forEach(row => {
      row.forEach(invoice => {
        this.invoiceList.push(invoice)
      })
    })
  }

  setSupplier() {
    this.invoiceList=[];
    this.modalService.supplierName = this.supplier;
    this.loadSupplierInvoices(this.supplier);
  }

}
