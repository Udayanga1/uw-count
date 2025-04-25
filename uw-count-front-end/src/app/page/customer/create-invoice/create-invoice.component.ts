import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalCreateInvoiceService } from '../../../service/modal-create-invoice.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InvoiceLine } from '../../../models/invoice-line';
import { Invoice } from '../../../models/invoice';

@Component({
  selector: 'app-create-invoice',
  imports: [FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {

  isCreateInvoiceOpen: boolean = true;
  private subscription!: Subscription;
  
  private creditPeriod: number = 14;
  private taxRate: number = 0.1;

  private http = inject(HttpClient);

  public subTotal: number = 0;
  public total: number = 0;
  public discount: number = 0;
  public tax: number = 0;
  
  invoiceDate: string ='';
  dueDate: string ='';
  customer: string   = ''; 
  invoiceNo: string  = '';
  
  constructor(private modalService: ModalCreateInvoiceService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isCreateInvoiceOpen.subscribe(
      (isCreateInvoiceOpen: boolean) => {
        this.isCreateInvoiceOpen = isCreateInvoiceOpen;
      } 
    );

    console.log("ngOnInit: CreateInvoiceTs");
    

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + this.creditPeriod);

    this.invoiceDate = today.toISOString().split('T')[0];
    this.dueDate = due.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal(): void {
    this.isCreateInvoiceOpen = false;
    this.subTotal = 0;
    this.discount = 0;
    this.tax = 0;
    this.total = 0; 
  }

  addRow(event: any): void{
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
      const productInput = newRow.querySelector('input[list="productlist"]');
      const removeButton = newRow.querySelector('button');
      const unitPrice = newRow.querySelector('.unit-price');
      const quantity = newRow.querySelector('.quantity');
      const checkBox = newRow.querySelector('.form-check-input');
      if (productInput) {
        productInput.addEventListener('change', this.addRow.bind(this));
        removeButton?.addEventListener('click', this.removeRow.bind(this));
        unitPrice?.addEventListener('change', this.calAmount.bind(this));
        quantity?.addEventListener('change', this.calAmount.bind(this));
        checkBox?.addEventListener('change', this.calAmount.bind(this));
      }

      tbody.insertBefore(newRow, tbody.querySelector('datalist'));
    }
  }

  removeRow(event: any): void {
    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement;
    
    const tableChildElementCount = tbody.children.length;
    console.log(tableChildElementCount);
    
    // console.log(tbody.children.length);
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
    
    const totalRowAmounts = tbody.querySelectorAll('.amount');

    const unitPrice = parseFloat(unitPriceInput?.value || '0');
    const quantity = parseFloat(quantityInput?.value || '0');

    const rowAmount = unitPrice * quantity;

    amount.value = rowAmount ? rowAmount : 0;
    
    this.subTotal = 0;
    this.tax = 0;
    totalRowAmounts.forEach((amount: any)=>{
      const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
      const taxAmount = amount.parentElement.querySelector('.form-check-input').checked ? value * this.taxRate : 0;
      this.tax+=taxAmount;
      this.subTotal+= value;
    })

    const taxableSupply = this.tax/this.taxRate;   
    const taxReductionDueToDiscount: number = parseFloat((this.discount * (taxableSupply/this.subTotal) * this.taxRate).toFixed(2));        

    this.tax-=taxReductionDueToDiscount;

    this.total = this.subTotal - this.discount + this.tax;        
  }

  recalculateTotals(): void {
    const tbody = document.querySelector('table tbody');
    this.subTotal=0;
    this.tax = 0;
    const totalRowAmounts = tbody?.querySelectorAll('.amount') || [];
    totalRowAmounts.forEach((amount: any) => {
      const value = amount.value.length > 0 ? parseFloat(amount.value) : 0;
      const taxAmount = amount.parentElement.querySelector('.form-check-input').checked ? value * this.taxRate : 0;
      this.tax+=taxAmount;
      this.subTotal += value;
    });

    const taxableSupply: number = this.tax/this.taxRate;   
    const taxReductionDueToDiscount: number = parseFloat((this.discount * (taxableSupply/this.subTotal) * this.taxRate).toFixed(2));        

    this.tax-=taxReductionDueToDiscount;

    this.total = this.subTotal - this.discount + +this.tax;
  }

  saveAndClose(): void {
    // console.log("save invoice");
    // this.closeModal();
    if (!this.customer || this.total <= 0) {
      alert('Please select a customer and add at least one line item.');
      return;
    }

    const tbody = document.querySelector('table tbody');
    const rows  = tbody?.querySelectorAll('tr') || [];
    const lines: InvoiceLine[] = [];

    rows.forEach(row => {
      const prodInput  = row.querySelector('.product') as HTMLInputElement;
      const descInput  = row.querySelector('.description') as HTMLInputElement;
      const rateInput  = row.querySelector('.unit-price') as HTMLInputElement;
      const qtyInput   = row.querySelector('.quantity') as HTMLInputElement;
      const amtInput   = row.querySelector('.amount') as HTMLInputElement;
      const taxInput   = row.querySelector('.taxable') as HTMLInputElement;

      if (prodInput.value && +amtInput.value > 0) {
        lines.push({
          id:          null,
          productId:   2,
          description: descInput.value,
          rate:        +rateInput.value,
          quantity:    +qtyInput.value,
          amount:      +amtInput.value,
          taxable:     taxInput.checked,
          invoiceId:   null
        });
      }
    });

    const invoice: Invoice = {
      id:           null,
      customerId:   +this.customer.replace(/\D/g,''), // parse out numeric ID
      invoiceNo:    "25",
      date:         this.invoiceDate,
      dueDate:      this.dueDate,
      subTotal:     this.subTotal,
      discount:     this.discount,
      tax:          this.tax,
      total:        this.total,
      invoiceLines: lines
    };

    console.log('Posting invoice:', invoice);

    this.http.post<Invoice>('http://localhost:8080/invoice/add', invoice)
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: err => {
          console.error('Failed to save invoice', err);
          alert('Could not save invoice. See console for details.');
        }
      });


  }

  saveAndNew(): void {
    this.saveAndClose();
    setTimeout(()=>{
      this.isCreateInvoiceOpen = true;
    }, 10);
  }
}
