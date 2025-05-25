import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReportsService } from '../../../service/reports.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PLLine } from '../../../models/profit-and-loss-line';

@Component({
  selector: 'app-profit-and-loss',
  imports: [FormsModule],
  templateUrl: './profit-and-loss.component.html',
  styleUrl: './profit-and-loss.component.css'
})
export class ProfitAndLossComponent implements OnInit, OnDestroy {

  private subscription! : Subscription;

  public isProfitAndLossOpen: boolean = true;

  public revenueList: PLLine[] = [];
  public otherRevenueList: PLLine[] = [];
  public expenseList: PLLine[] = [];
  public otherExpenseList: PLLine[] = [];

  public revenue: number = 0;
  public otherRevenue: number = 0;
  public expense: number = 0;
  public otherExpense: number = 0;
  public netProfit: number = 0;

  filter = {
    startDate: '',
    endDate: ''
  }

  constructor(private reportService: ReportsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.reportService.isProfitAndLossOpen.subscribe(
      (isProfitAndLossOpen: boolean) => {
        this.isProfitAndLossOpen = isProfitAndLossOpen;
      }
    )

    this.retrievePLData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeReport() {
    this.isProfitAndLossOpen = false;
  }

  retrievePLData(): void {

    this.revenueList = [];
    this.otherRevenueList = [];
    this.expenseList = [];
    this.otherExpenseList = [];

    this.revenue = 0;
    this.otherRevenue = 0;
    this.expense = 0;
    this.otherExpense =0;
    this.netProfit = 0;

    const body = {
      startDate: this.filter.startDate,
      endDate: this.filter.endDate
    };

    this.http.post<PLLine[]>('http://localhost:8080/report/pl', body)
      .subscribe(data => {
        data.forEach(row => {
          console.log('PL Data item :', row);
          if (row.accountType === "Revenue") {
            this.revenueList.push(row)
            this.revenue+= row.amount;
          } else if (row.accountType === "Other Revenue") {
            this.otherRevenueList.push(row);
            this.otherRevenue+= row.amount;
          } else if (row.accountType === "Expense") {
            this.expenseList.push(row);
            this.expense+= row.amount;
          } else if (row.accountType === "Other Expense") {
            this.otherExpenseList.push(row);
            this.otherExpense+= row.amount;
          } else if (row.accName === "Net Profit" && row.accountType === "Profit") {
            this.netProfit = row.amount;
          }
            
        })
      }, error => {
        console.error('Error fetching PL Data', error);
      });
    }

}
