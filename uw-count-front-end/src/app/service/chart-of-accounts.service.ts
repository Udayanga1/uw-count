import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Account } from '../models/account';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {

  private url = 'http://localhost:8080/account/get-all-alternative';

  constructor(private http: HttpClient) {}


  isChartOfAccountsOpen = new EventEmitter<boolean>();

  getAccounts(): Observable<Account[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(data =>
        data.map(a => ({
          code: a.accountCode.toString(),
          name: a.name,
          type: a.type
        }))
      )
    );
  }

}
