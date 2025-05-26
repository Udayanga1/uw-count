import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor() { }

  isProfitAndLossOpen = new EventEmitter<boolean>();

  isBalanceSheetOpen = new EventEmitter<boolean>();
}
