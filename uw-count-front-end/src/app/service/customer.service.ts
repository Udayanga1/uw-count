import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = 'http://localhost:8080/customer'

  constructor(private readonly http: HttpClient) {}

  isCustomersOpen = new EventEmitter<boolean>();

  addCustomer(data: Customer): Observable<Customer>{
    return this.http.post<Customer>(`${this.baseUrl}/add`, data);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<any>(`${this.baseUrl}/get-all`);
  }

  updateCustomer(data: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/update`, data);
  }
}
