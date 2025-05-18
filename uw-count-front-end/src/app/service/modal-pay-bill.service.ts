import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Bill } from '../models/bill';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalPayBillService {

  isPayBillsOpen = new EventEmitter<boolean>();

  private url = 'http://localhost:8080/bill/get-all';

  constructor(private http: HttpClient) {}

  supplierName: string = '';

  getSupplierBills(supplierName: String): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.url}/${supplierName}`).pipe(
      map(data =>
        data.map(a => {
          return {
            id: a.id ?? 0,
            supplierId: a.supplierId,
            invoiceNo: a.invoiceNo,
            date: a.date,
            dueDate: a.dueDate,
            subTotal: a.subTotal,
            discount: a.discount,
            payableBal: a.payableBal ?? null,
            tax: a.tax,
            billTransactions: a.billTransactions ?? []
          };
        })
      )
    );
  }


  
  
}
