import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JournalEntryService } from '../../../service/journal-entry.service';

@Component({
  selector: 'app-journal-entry',
  imports: [],
  templateUrl: './journal-entry.component.html',
  styleUrl: './journal-entry.component.css'
})
export class JournalEntryComponent implements OnInit, OnDestroy {

  public isJournalEntryOpen: boolean = true;

  private subscription!: Subscription;

  public total:number = 0;

  public modifiedAccountList:String[] = [];

  constructor(private jEService: JournalEntryService) {}

  ngOnInit(): void {
    this.subscription = this.jEService.isJournalEntryOpen.subscribe(
      (isJournalEntryOpen: boolean) => {
        this.isJournalEntryOpen = isJournalEntryOpen;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeJournalEntry() {
    this.isJournalEntryOpen = false;
  }
  
  saveAndClose() {

  }

  saveAndNew(){

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

    // this.recalculateTotals();
    
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
    
    // this.subTotal = 0;
    // totalRowAmounts.forEach((amount: any)=>{
    //   const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
    //   this.subTotal+= value;
    // })
    // this.total = Number(this.subTotal) - Number(this.discount) + Number(this.tax);        
  }

  // recalculateTotals(): void {
  //   const tbody = document.querySelector('table tbody');
  //   let newSubTotal = 0;
    
  //   const totalRowAmounts = tbody?.querySelectorAll('.amount') || [];
  //   totalRowAmounts.forEach((amount: any) => {
  //     const value = amount.value.length > 0 ? parseFloat(amount.value) : 0;
  //     newSubTotal += value;
  //   });
    
  //   this.subTotal = newSubTotal;
  //   this.total = this.subTotal - this.discount + +this.tax;
  // }

}
