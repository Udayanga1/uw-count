import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl: string = 'http://localhost:8080/product'

  constructor(private readonly http: HttpClient) {}

  addProduct(data: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/add`, data);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}/get-all`);
  }
}
