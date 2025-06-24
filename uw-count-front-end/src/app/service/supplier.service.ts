import { EventEmitter, Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  
  constructor(private readonly http: HttpClient) { }
  
  isAddSupplierOpen = new EventEmitter<boolean>();

  supplierName: string = "";

  supplierList: Supplier[] = [
    
  ];

  private readonly baseUrl: string = 'http://localhost:8080/supplier';

  loadSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/get-all`);
  }

  addSupplier(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(`${this.baseUrl}/add`, supplier)
  }

  checkEmail(email: string): void {
    this.http.get<Supplier>(`${this.baseUrl}/search/email/${email}`, {observe: 'response'}).subscribe(res => {
      alert("this email is registered with " + res.body?.name);
    })
  }

  checkContactNo(contactNo: string): void {
    this.http.get<Supplier>(`${this.baseUrl}/search/contact/${contactNo}`, {observe: 'response'}).subscribe(res => {
      alert("this contact no. is registered with " + res.body?.name);
    })
  }
}
