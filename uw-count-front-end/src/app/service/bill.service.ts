import { Injectable } from '@angular/core';
import { Bill } from '../models/bill';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BillPayment } from '../models/bill-pmt';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private readonly http: HttpClient){}
  
  public supplierName: string = '';

  private readonly baseUrl: string = 'http://localhost:8080/bill';

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/add`, bill);
  }

  payBill(billPayment: BillPayment): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/pay-bills`, billPayment)
  }

  //http://localhost:8080/bill/get-all

  getSupplierBills(supplierName: string): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/get-all/${supplierName}`).pipe(
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
