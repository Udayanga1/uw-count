import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartOfAccountsService } from '../../../service/chart-of-accounts.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../../models/account';
import { FormsModule } from '@angular/forms';

type SortField = 'code' | 'name' | 'type';
type SortDir   = 'asc' | 'desc';

@Component({
  selector: 'app-chart-of-accounts',
  imports: [FormsModule],
  templateUrl: './chart-of-accounts.component.html',
  styleUrl: './chart-of-accounts.component.css'
})

export class ChartOfAccountsComponent implements OnInit, OnDestroy {

  isChartOfAccountsOpen: boolean = true;
  private subscription!: Subscription;
  private accountListSubscription!: Subscription;

  accountList: Account[] = [];

  filterText = '';
  sortField: SortField = 'code';
  sortDirection: SortDir   = 'asc';

  showAddForm = false;
  newAccount: Account = { code: '', name: '', type: 'Type' };

  constructor(private modalService: ChartOfAccountsService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.modalService.isChartOfAccountsOpen.subscribe(
      (isChartOfAccountsOpen: boolean) => {
        this.isChartOfAccountsOpen = isChartOfAccountsOpen;
      } 
    );
    
    this.accountListSubscription = this.modalService.getAccounts().subscribe(accounts => {
      this.accountList = accounts;
    })
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.isChartOfAccountsOpen = false;
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
    this.accountList.push({ ...this.newAccount });
    this.resetNew();
    this.showAddForm = false;
  }


}
