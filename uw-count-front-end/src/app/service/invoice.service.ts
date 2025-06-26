import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  isCreateInvoiceOpen = new EventEmitter<boolean>();

  private readonly baseUrl = 'http://localhost:8080/invoice';

  constructor(private readonly http: HttpClient) {}

  addInvoice(data: Invoice): Observable<Invoice>{
      return this.http.post<Invoice>(`${this.baseUrl}/add`, data);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<any>(`${this.baseUrl}/get-all`);
  }

}
