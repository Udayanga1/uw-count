import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsService } from '../../../service/reports.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FSLine } from '../../../models/f-s-line';

@Component({
  selector: 'app-balance-sheet',
  imports: [FormsModule],
  templateUrl: './balance-sheet.component.html',
  styleUrl: './balance-sheet.component.css'
})
export class BalanceSheetComponent implements OnInit, OnDestroy {

  private subscription! : Subscription;

  public isBalanceSheetOpen: boolean = true;

  public balanceSheetDate: string = '';

  public cashAndBankList: FSLine[] = [];
  public currentassetList: FSLine[] = [];
  public nonCurrentAssetList: FSLine[] = [];

  public creditCardList: FSLine[] = [];
  public currentliabilityList: FSLine[] = [];
  public nonCurrentLiabilityList: FSLine[] = [];

  public cashAndBank: number = 0;
  public currentasset: number = 0;
  public nonCurrentAsset: number = 0;
  public creditCard: number = 0;
  public currentliability: number = 0;
  public nonCurrentLiability: number = 0;
  public retainedEarnings: number = 0;

  constructor(private reportService: ReportsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.reportService.isBalanceSheetOpen.subscribe(
      (isBalanceSheetOpen: boolean) => {
        this.isBalanceSheetOpen = isBalanceSheetOpen;
      }
    )
    this.retrieveBSData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeReport() {
    this.isBalanceSheetOpen = false;
  }

  
  retrieveBSData() {

    this.cashAndBankList = [];
    this.currentassetList = [];
    this.nonCurrentAssetList = [];
    this.creditCardList = [];
    this.currentliabilityList = [];
    this.nonCurrentLiabilityList = [];

    this.cashAndBank = 0;
    this.currentasset = 0;
    this.nonCurrentAsset = 0;
    this.creditCard = 0;
    this.currentliability = 0;
    this.nonCurrentLiability =0;
    this.retainedEarnings = 0;
    
    const body = {
      endDate: this.balanceSheetDate
    };

    this.http.post<FSLine[]>('http://localhost:8080/report/bs', body)
      .subscribe(data => {
        data.forEach(row => {
          console.log('BS Data item :', row);
          if (row.accountType === "Cash and Bank") {
            this.cashAndBankList.push(row)
            this.cashAndBank+= +row.amount;
          } else if (row.accountType === "Other Current Asset") {
            this.currentassetList.push(row)
            this.currentasset+= +row.amount;
          } else if (row.accountType === "Non Current Asset") {
            this.nonCurrentAssetList.push(row);
            this.nonCurrentAsset= +row.amount;
          } else if (row.accountType === "Credit Card") {
            this.creditCardList.push(row);
            this.creditCard-= +row.amount;
          } else if (row.accountType === "Other Current Liability") {
            this.currentliabilityList.push(row);
            this.currentliability-= +row.amount;
          } else if (row.accountType === "Non Current Liability") {
            this.nonCurrentLiabilityList.push(row);
            this.nonCurrentLiability-= +row.amount;
          } else if (row.accName === "Retained Earnings" && row.accountType === "Equity") {
            this.retainedEarnings = -row.amount;
          }
            
        })
      }, error => {
        console.error('Error fetching PL Data', error);
      });
    }
  

}
