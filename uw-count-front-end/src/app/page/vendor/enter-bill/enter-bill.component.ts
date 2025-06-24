import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BillTransaction } from '../../../models/bill-transaction';
import { Bill } from '../../../models/bill';
import { SupplierService } from '../../../service/supplier.service';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Router, RouterLink } from '@angular/router';
import { BillService } from '../../../service/bill.service';

@Component({
  selector: 'app-enter-bill',
  imports: [FormsModule, RouterLink],
  templateUrl: './enter-bill.component.html',
  styleUrl: './enter-bill.component.css'
})
export class EnterBillComponent implements OnInit {

  private creditPeriod: number = 14;

  public subTotal: number = 0;
  public total: number = 0;
  public discount: number = 0;
  public tax: number = 0;
  
  public invoiceDate: string ='';
  public dueDate: string ='';
  public supplier:string = '';
  public invoice:string = '';

  public supplierList: String[] = [];

  public showAddSupplierButton = false;

  modifiedAccountList:String[] = [];
  
  constructor(private readonly service: BillService, private readonly supplierService: SupplierService, private readonly coaService: ChartOfAccountsService, private readonly router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + this.creditPeriod);

    this.invoiceDate = today.toISOString().split('T')[0];
    this.dueDate = due.toISOString().split('T')[0];

    this.loadChartOfAccounts();

    this.supplierService.loadSuppliers().subscribe(suppliers => {
      this.supplierService.supplierList = suppliers;
      this.supplierList = suppliers.map(s => s.name);
    })
  }

  addRow(event: any): void{

    this.calAmount(event);
    
    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement

    const nextRow = currentRow.nextElementSibling;

    if(!nextRow || nextRow.tagName != 'TR') {

      const newRow = currentRow.cloneNode(true) as HTMLTableRowElement;

      // Clear input values
      Array.from(newRow.querySelectorAll('input')).forEach(input => {
        (input as HTMLInputElement).value = '';
      });

      // Rebind event
      const accountInput = newRow.querySelector('input[list="accountlist"]');
      const removeButton = newRow.querySelector('button');
      const unitPrice = newRow.querySelector('.unit-price');
      const quantity = newRow.querySelector('.quantity');
      if (accountInput) {
        accountInput.addEventListener('change', this.addRow.bind(this));
        removeButton?.addEventListener('click', this.removeRow.bind(this));
        unitPrice?.addEventListener('change', this.calAmount.bind(this));
        quantity?.addEventListener('change', this.calAmount.bind(this));
      }

      tbody.insertBefore(newRow, tbody.querySelector('datalist'));
    }
  }

  removeRow(event: any): void {
    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement;
    
    const tableChildElementCount = tbody.children.length;
    
    if (tableChildElementCount==2) {
        Array.from(currentRow.querySelectorAll('input')).forEach(input => {
        (input as HTMLInputElement).value = '';
      });
    } else {
      currentRow.classList.add('remove');
      tbody.removeChild(tbody.querySelector('.remove'));
    }
    this.recalculateTotals();
    
  }
  
  calAmount(event: any): void {
    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement;
    
    const unitPriceInput = currentRow.querySelector('.unit-price');
    const quantityInput = currentRow.querySelector('.quantity');
    const amount = currentRow.querySelector('.amount');
    const account = currentRow.querySelector('.account');
    const totalRowAmounts = tbody.querySelectorAll('.amount');

    const unitPrice = parseFloat(unitPriceInput?.value || '0');
    const quantity = parseFloat(quantityInput?.value || '0');

    const rowAmount = account.value.length>0 ? unitPrice * quantity : 0;

    amount.value = rowAmount ? rowAmount : 0;
    
    this.subTotal = 0;
    totalRowAmounts.forEach((amount: any)=>{
      const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
      this.subTotal+= value;
    })
    this.total = Number(this.subTotal) - Number(this.discount) + Number(this.tax);        
  }

  recalculateTotals(): void {
    const tbody = document.querySelector('table tbody');
    let newSubTotal = 0;
    
    const totalRowAmounts = tbody?.querySelectorAll('.amount') || [];
    totalRowAmounts.forEach((amount: any) => {
      const value = amount.value.length > 0 ? parseFloat(amount.value) : 0;
      newSubTotal += value;
    });
    
    this.subTotal = newSubTotal;
    this.total = this.subTotal - this.discount + +this.tax;
  }

  saveAndClose(): void {
    if (!this.supplier || !this.invoice || this.total <= 0) {
      alert('Please fill supplier, invoice number and at least one line item.');
      return;
    }

    const tbody = document.querySelector('table tbody');
    const rows = tbody?.querySelectorAll('tr') || [];
    const transactions: BillTransaction[] = [];

    rows.forEach(rowElem => {
      const accountInput = rowElem.querySelector('input.account') as HTMLInputElement;
      const descInput = rowElem.querySelector('input.form-control[type="text"]') as HTMLInputElement;
      // const dateInput = this.invoiceDate as HTMLInputElement;
      const qtyInput = rowElem.querySelector('.quantity') as HTMLInputElement;
      const priceInput = rowElem.querySelector('.unit-price') as HTMLInputElement;
      const amountInput = rowElem.querySelector('.amount') as HTMLInputElement;

      if (accountInput.value && +amountInput.value > 0) {
        transactions.push({
          id: null,
          accountId: +accountInput.value.split(' ')[0], // assumes "id - name"
          description: descInput.value,
          date: this.invoiceDate as any,
          qty: +qtyInput.value,
          unitPrice: +priceInput.value,
          amount: +amountInput.value,
          billId: null
        });
      }
    });

    const bill: Bill = {
      id: null,
      supplierId: +this.supplier.replace(/\D/g, ''), // parse id
      invoiceNo: this.invoice,
      date: this.invoiceDate as any,
      dueDate: this.dueDate as any,
      subTotal: this.subTotal,
      discount: this.discount,
      tax: this.tax,
      payableBal: 0,
      billTransactions: transactions
    };

    this.service.addBill(bill)
      .subscribe({
        next: created => {
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Error creating bill', err);
          alert('Failed to save bill');
        }
      });
  }

  saveAndNew(): void {
    this.saveAndClose();
    setTimeout(()=>{
      this.router.navigate(['suppliers/enter-bill']);
    }, 200);
  }

  loadChartOfAccounts(): void {
    this.coaService.getAccounts().forEach(row=>{
      row.forEach(item=>{
        this.modifiedAccountList.push(item.code + " " + item.name)
      })
    })
  }
  
  onSupplierChange(){
    const exists = this.supplierList.includes(this.supplier);
    this.showAddSupplierButton = !exists
    this.supplierList = this.supplierService.supplierList.map(s=>s.name);
  }

  openAddSupplierModal(): void {
    this.supplierService.supplierName = this.supplier;
    this.router.navigate(['suppliers']);
  }
}
