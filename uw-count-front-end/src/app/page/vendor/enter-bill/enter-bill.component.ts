import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalEnterBillService } from '../../../service/modal-enter-bill.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enter-bill',
  imports: [FormsModule],
  templateUrl: './enter-bill.component.html',
  styleUrl: './enter-bill.component.css'
})
export class EnterBillComponent implements OnInit, OnDestroy {

  isEnterBillsOpen: boolean = true;
  private subscription!: Subscription;
  private creditPeriod: number = 14;

  public subTotal: number = 0;
  public total: number = 0;
  public discount: number = 0;
  public tax: number = 0;
  
  invoiceDate: string ='';
  dueDate: string ='';
  
  constructor(private modalService: ModalEnterBillService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isEnterBillsOpen.subscribe(
      (isEnterBillsOpen: boolean) => {
        this.isEnterBillsOpen = true;
      } 
    );

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + this.creditPeriod); // Example: 30 days from today

    this.invoiceDate = today.toISOString().split('T')[0];
    this.dueDate = due.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal(): void {
    this.isEnterBillsOpen = false;
    this.subTotal = 0;
    this.discount = 0;
    this.tax = 0;
    this.total = 0; 
  }

  addRow(event: any): void{
    // console.log("addRow: " + event.target.closest('tr').querySelector('.quantity')?.value);
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
    console.log("save invoice");
    this.closeModal();
  }

  saveAndNew(): void {
    this.saveAndClose();
    setTimeout(()=>{
      this.isEnterBillsOpen = true;
    }, 10);
  }
}
