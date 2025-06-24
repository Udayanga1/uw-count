import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { Account } from '../../../models/account';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type SortField = 'code' | 'name' | 'type';
type SortDir   = 'asc' | 'desc';

@Component({
  selector: 'app-chart-of-accounts',
  imports: [FormsModule, RouterLink],
  templateUrl: './chart-of-accounts.component.html',
  styleUrl: './chart-of-accounts.component.css'
})

export class ChartOfAccountsComponent implements OnInit {

  private accountListSubscription!: Subscription;

  accountList: Account[] = [];

  filterText = '';
  sortField: SortField = 'code';
  sortDirection: SortDir   = 'asc';

  showAddForm = false;
  newAccount: Account = { code: '', name: '', type: 'Type' };

  constructor(private readonly service: ChartOfAccountsService) {}

  ngOnInit(): void {
    this.accountListSubscription = this.service.getAccounts()
      .subscribe(list => this.accountList = list);
    
  }

  get displayedAccounts(): Account[] {
    // 1) filter
    const filtered = this.accountList.filter(a => {
      const txt = this.filterText.toLowerCase();
      return a.code.toLowerCase().includes(txt)
          || a.name.toLowerCase().includes(txt)
          || a.type.toLowerCase().includes(txt);
    });

    // 2) sort
    return filtered.sort((a, b) => {
      const aVal = ('' + a[this.sortField]).toLowerCase();
      const bVal = ('' + b[this.sortField]).toLowerCase();
      const cmp  = aVal.localeCompare(bVal);
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  resetNew() {
    this.newAccount = { code: '', name: '', type: 'Type' };
  }

  addAccount() {
    const data: any = {
        accountCode: this.newAccount.code,
        name: this.newAccount.name,
        typeId: this.newAccount.type
    }

    this.service.addAccount(data)
      .subscribe({
        next: created => {
          this.service.getAccounts()
            .subscribe(list => {
              this.accountList = list;
              this.resetNew();
              this.showAddForm = false;
            });
        },
        error: err => {
          console.error('Error creating account', err);
          alert('Failed to save account');
        }
      });
  }
}
