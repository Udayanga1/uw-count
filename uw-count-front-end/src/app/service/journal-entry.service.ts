import { Injectable } from '@angular/core';
import { Journal } from '../models/journal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {

  constructor(private readonly http: HttpClient) { }

  addJournal(je: Journal): Observable<Journal> {
    return this.http.post<Journal>('http://localhost:8080/je/add', je)
  }

}
