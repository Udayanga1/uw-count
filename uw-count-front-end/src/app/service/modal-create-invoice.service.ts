import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateInvoiceService {

  isCreateInvoiceOpen = new EventEmitter<boolean>();

  private baseUrl = 'http://localhost:8080/invoice';

  constructor(private http: HttpClient) {}

  addInvoice(data: Invoice): Observable<Invoice>{
      return this.http.post<Invoice>(`${this.baseUrl}/add`, data);
  }

}
