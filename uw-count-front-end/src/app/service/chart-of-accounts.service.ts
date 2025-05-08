import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {

  private url = 'assets/chart-of-accounts.json';

  private httpClient = inject(HttpClient);

  constructor(private http: HttpClient) {}

  isChartOfAccountsOpen = new EventEmitter<boolean>();

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url);
  }

}
