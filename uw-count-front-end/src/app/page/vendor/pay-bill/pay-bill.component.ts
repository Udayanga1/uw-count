import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../models/account';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Bill } from '../../../models/bill';
import { Supplier } from '../../../models/supplier';
import { SupplierService } from '../../../service/supplier.service';
import { BillPayment } from '../../../models/bill-pmt';
import { BillPmtTransaction } from '../../../models/bill-pmt-transaction';
import { Router, RouterLink } from '@angular/router';
import { BillService } from '../../../service/bill.service';

@Component({
  selector: 'app-pay-bill',
  imports: [FormsModule, RouterLink],
  templateUrl: './pay-bill.component.html',
  styleUrl: './pay-bill.component.css'
})


export class PayBillComponent implements OnInit {

  public payDate: string = '';

  public supplier = '';
  public payingAccount = '';
  public paymentMethod = '1';

  private payingAccountCode: string = '';

  invoiceList: Bill[] = [];

  payingAccountList:Account[] = [];

  supplierList: Supplier[] = [];

  total: number = this.invoiceList.length>0 ? this.invoiceList[0].payableBal : 0;

  constructor(private readonly service: BillService, private readonly coaService: ChartOfAccountsService, private readonly supplierService: SupplierService, private readonly router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    this.payDate = today.toISOString().split('T')[0];
    
    this.loadCashAndBankOfAccounts();

    this.supplierService.loadSuppliers().subscribe(suppliers => {
      this.supplierService.supplierList = suppliers;
      
      this.supplierList = suppliers.map(s => s);
    })
    
  }

  fillPayingAmount(event: any): void {

    let changeAmountPaying: boolean = true;

    const currentRow = event.target.closest('tr');
        
    const invoiceAmount = currentRow.querySelector('.invoice-value');
    const discount = currentRow.querySelector('.discount');
    const amountToPay = currentRow.querySelector('.amount-to-pay');
    const amountPaying = currentRow.querySelector('.amount-paying');
    const payingAmountRows = currentRow.parentElement.querySelectorAll('.amount-paying');

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

    let amountPaying: number = currentRow.querySelector('.amount-paying').value;
    const amountToPay: number = currentRow.querySelector('.amount-to-pay').value;
    const invoice: string = currentRow.querySelector('.invoice-no').value;

    if (+amountPaying > +amountToPay) {      
      alert(`${invoice}: amount paying should equal or lesser than amount to pay`);
      currentRow.querySelector('.amount-paying').value = amountToPay;
    }

    this.total = 0;
    payingAmountRows.forEach((row: any) => {
      const value = row.value.length>0 ? parseFloat(row.value) : 0;
      this.total+=value;
    })

    if (amountPaying > 0) {
      currentRow.querySelector('.form-check-input').checked = true;
    } else {
      currentRow.querySelector('.form-check-input').checked = false;
    }
    totalInput.value = this.total;
  }

  setPayingAccountCode() {
    this.payingAccountList.forEach(account => {
      if (this.payingAccount == account.name) {
        this.payingAccountCode = account.code;
      }
    })
  }

  payAndNew() {
    this.payAndClose();
    setTimeout(()=>{
      this.router.navigate(['suppliers/pay-bill']);
    }, 200);
  }

  payAndClose(){
    if (!this.supplier || !this.payingAccount || this.total <= 0) {
      alert('Please fill supplier, paying account and at least one line item.');
      return;
    }

    const billPmtTransactions: BillPmtTransaction[] = [];

    document.querySelectorAll('.form-check-input:checked').forEach(item => {
      const row = item.closest('tr')!;  // assert it’s non-null
      const payingAmountInput = row.querySelector<HTMLInputElement>('.amount-paying')!;
      const discountInput = row.querySelector<HTMLInputElement>('.discount')!;
      const billId = row.querySelector<HTMLInputElement>('.bill_id')!;

      const paying  = parseFloat(payingAmountInput.value || '0');
      const discount = parseFloat(discountInput.value    || '0');

      billPmtTransactions.push({
        id: null,
        paymentId: null,
        billId: +billId.value,
        amountPaying: paying,
        discountApplied: discount
      })
    })

    const billPayment: BillPayment = {
      id: null,
      date: this.payDate,
      payingAccountId: +this.payingAccountCode,
      total: this.total,
      billPaymentTransaction: billPmtTransactions
    };
    
    
    this.service.payBill(billPayment)
      .subscribe({
        next: created => {
          this.router.navigate(['/'])
        },
        error: err => {
          console.error('Error saving payment', err);
          alert('Failed to save payment');
        }
      });
  }

  loadCashAndBankOfAccounts(): void {
    this.payingAccountList = [];
    this.payingAccount = '';
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
    this.service.getSupplierBills(supplierName).forEach(row => {
      row.forEach(invoice => {
        if (invoice.payableBal>0) {
          this.invoiceList.push(invoice)
        }
      })
    })
  }

  setSupplier() {
    this.invoiceList=[];
    this.service.supplierName = this.supplier;
    this.loadSupplierInvoices(this.supplier);
  }

}
