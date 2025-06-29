import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../../service/journal-entry.service';
import { FormsModule } from '@angular/forms';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Journal } from '../../../models/journal';
import { JournalLine } from '../../../models/journal-line';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-journal-entry',
  imports: [FormsModule, RouterLink],
  templateUrl: './journal-entry.component.html',
  styleUrl: './journal-entry.component.css'
})
export class JournalEntryComponent implements OnInit {

  public date: string = new Date().toISOString().substring(0, 10);

  public narration: string = '';

  public isEmptyAccount: boolean = false;

  public debitTotal: number = 0;
  public creditTotal: number = 0;

  public modifiedAccountList:String[] = [];

  private journalLines: JournalLine[] = [];

  constructor(private readonly jEService: JournalEntryService, private readonly coaService: ChartOfAccountsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadChartOfAccounts();
    this.date = new Date().toISOString().substring(0, 10);
  }
  
  saveAndClose() {

    this.journalLines = [];

    const accountInputs = document.querySelectorAll('.account');

    accountInputs.forEach((accountInput: any) => {
      if (accountInput?.value?.length > 0) {
        const row = accountInput.closest('tr');

        const debitInput = row.querySelector('.debit');
        const creditInput = row.querySelector('.credit');
        const descriptionInput = row.querySelector('.description');

        const debitValue = debitInput?.value ? +debitInput.value : 0;
        const creditValue = creditInput?.value ? +creditInput.value : 0;

        const amount = debitValue > 0 ? debitValue : -creditValue;

        console.log("debitValue: " + debitInput + " creditValue: " + creditInput);

        this.journalLines.push({
          accountCode: +accountInput.value.split(' ')[0],
          amount: amount,
          description: descriptionInput?.value || ''
        });

      }
    });
    
    const je: Journal = {
      narration: this.narration,
      date: this.date,
      jeLines: this.journalLines
    }

    this.jEService.addJournal(je)
      .subscribe({
        next: created => {
          this.router.navigate(["/"]);
        },
        error: err => {
          console.error('Error saving journal entry', err);
          alert('Failed to save journal entry');
        }
      });
  }

  saveAndNew(){
    this.saveAndClose();
    setTimeout(() => {
      this.router.navigate(["company/enter-journal"]);
    }, 200);
  }


  addRow(event: any): void{
    
    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement;

    const nextRow = currentRow.nextElementSibling;

    if(!nextRow || nextRow.tagName != 'TR') {

      const newRow = currentRow.cloneNode(true) as HTMLTableRowElement;

      // Clear input values
      Array.from(newRow.querySelectorAll('input')).forEach(input => {
        (input as HTMLInputElement).value = '';
      });

      // Rebind event
      const accountInput = newRow.querySelector('input[list="accountlist"]');
      const removeButton = newRow.querySelector('.btn-close');
      const debitAmount = newRow.querySelector('.debit');
      const creditAmount = newRow.querySelector('.credit');
      if (accountInput) {
        accountInput.addEventListener('change', this.addRow.bind(this));
        removeButton?.addEventListener('click', this.removeRow.bind(this));
        debitAmount?.addEventListener('change', this.calTotals.bind(this));
        creditAmount?.addEventListener('change', this.calTotals.bind(this));
      }

      tbody.insertBefore(newRow, tbody.querySelector('datalist'));
    }

    if (!this.modifiedAccountList.includes(event.target.value)) {
      alert(`${event.target.value} does not exist in Chart of Accounts`);
      event.target.value='';
    }

    this.calTotals(event);
  }

  removeRow(event: any): void {
    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement;

    console.log(currentRow);
    
    
    const tableChildElementCount = tbody.children.length;
    
    if (tableChildElementCount==2) {
        Array.from(currentRow.querySelectorAll('input')).forEach(input => {
        (input as HTMLInputElement).value = '';
      });
    } else {
      currentRow.classList.add('remove');
      tbody.removeChild(tbody.querySelector('.remove'));
    }

    // cal totals after remove row
    const totalDebitAmounts = document.querySelectorAll('.debit');
    const totalCreditAmounts = document.querySelectorAll('.credit');

    this.isEmptyAccount = false;
    
    this.debitTotal = 0;
    this.creditTotal = 0;
    totalDebitAmounts.forEach((amount: any)=>{
      const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
      this.debitTotal+= value;
      if (value>0 && amount.closest('tr').querySelector('.account').value.length == 0) {
        this.isEmptyAccount = true;
      }
      
    });

    totalCreditAmounts.forEach((amount: any)=>{
      const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
      this.creditTotal+= value;
      if (value>0 && amount.closest('tr').querySelector('.account').value.length == 0) {
        this.isEmptyAccount = true;
      }
    });
    
  }
  
  calTotals(event: any): void {

    if (event.target.value < 0) {
      alert("Negative value is not allowed!");
      event.target.value = 0;
      return;
    }

    const currentRow = event.target.closest('tr');
    const tbody = currentRow.parentElement;
    
    const debit = currentRow.querySelector('.debit');
    const credit = currentRow.querySelector('.credit');
    // const account = currentRow.querySelector('.account');
    const totalDebitAmounts = tbody.querySelectorAll('.debit');
    const totalCreditAmounts = tbody.querySelectorAll('.credit');

    const debitAmount = parseFloat(debit?.value || '0');
    const creditAmount = parseFloat(credit?.value || '0');

    if(event.target.classList.contains('debit') && creditAmount > 0) {
      currentRow.querySelector('.credit').value = '';
    }
    if(event.target.classList.contains('credit') && debitAmount > 0) {
      currentRow.querySelector('.debit').value = '';
    }

    this.isEmptyAccount = false;
    
    this.debitTotal = 0;
    this.creditTotal = 0;
    totalDebitAmounts.forEach((amount: any)=>{
      const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
      this.debitTotal+= value;
      if (value>0 && amount.closest('tr').querySelector('.account').value.length == 0) {
        this.isEmptyAccount = true;
      }
      
    });

    totalCreditAmounts.forEach((amount: any)=>{
      const value = amount.value.length>0 ? parseFloat(amount.value) : 0;
      this.creditTotal+= value;
      if (value>0 && amount.closest('tr').querySelector('.account').value.length == 0) {
        this.isEmptyAccount = true;
      }
    });
    
  }

  loadChartOfAccounts(): void {
    this.coaService.getAccounts().forEach(row=>{
      row.forEach(item=>{
        this.modifiedAccountList.push(item.code + " " + item.name)
      })
      
    })
  }

}
