import { EventEmitter, Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  
  constructor(private httpClient: HttpClient) { }
  
  isAddSupplierOpen = new EventEmitter<boolean>();

  supplierName: string = "";

  supplierList: Supplier[] = [
    
  ];

  loadSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>('http://localhost:8080/supplier/get-all');
  }
}
