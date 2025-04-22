import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalCreateInvoiceService } from '../../../service/modal-create-invoice.service';
import { FormsModule } from '@angular/forms';

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

  public subTotal: number = 0;
  public total: number = 0;
  public discount: number = 0;
  public tax: number = 0;
  
  invoiceDate: string ='';
  dueDate: string ='';
  
  constructor(private modalService: ModalCreateInvoiceService) {}

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
    console.log("save invoice");
    this.closeModal();
  }

  saveAndNew(): void {
    this.saveAndClose();
    setTimeout(()=>{
      this.isCreateInvoiceOpen = true;
    }, 10);
  }
}
