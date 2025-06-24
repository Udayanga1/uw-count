import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {

  private baseUrl = 'http://localhost:8080/account';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-all-alternative`).pipe(
      map(data =>
        data.map(a => ({
          code: a.accountCode.toString(),
          name: a.name,
          type: a.type
        }))
      )
    );
  }

  addAccount(data: Account): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/add`, data);
  }

}
