import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {

  private url = 'assets/chart-of-accounts.json';

  private httpClient = inject(HttpClient);

  constructor(private http: HttpClient) {}

  getAccounts(): Account[] {
    let accountList: Account[] = [];
    this.httpClient.get<Account[]>(this.url).subscribe((data:Account[]) => {
      // console.log(data);
      accountList = data;
    });
      
    return accountList; 
  }

}
