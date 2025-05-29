import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {

  constructor() { }

  isJournalEntryOpen = new EventEmitter<boolean>();
}
