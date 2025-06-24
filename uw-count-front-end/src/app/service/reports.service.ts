import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FSLine } from '../models/f-s-line';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private readonly baseUrl: string = 'http://localhost:8080/report';

  constructor(private readonly http: HttpClient) { }

  retrieveBSData(data: any): Observable<FSLine[]>{
    return this.http.post<FSLine[]>(`${this.baseUrl}/bs`, data);
  }
  
  retrievePLData(data: any): Observable<FSLine[]> {
    return this.http.post<FSLine[]>('http://localhost:8080/report/pl', data);
  }
}
