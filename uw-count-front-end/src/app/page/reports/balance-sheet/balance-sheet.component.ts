import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../service/reports.service';
import { FormsModule } from '@angular/forms';
import { FSLine } from '../../../models/f-s-line';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-balance-sheet',
  imports: [FormsModule, RouterLink],
  templateUrl: './balance-sheet.component.html',
  styleUrl: './balance-sheet.component.css'
})
export class BalanceSheetComponent implements OnInit {

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

  constructor(private readonly service: ReportsService) {}

  ngOnInit(): void {
    this.retrieveBSData();
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
    
    const endDate = {
      endDate: this.balanceSheetDate
    };

    this.service.retrieveBSData(endDate)
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
        console.error('Error fetching BS Data', error);
      });
    }
  

}
