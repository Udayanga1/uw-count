import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../service/reports.service';
import { FormsModule } from '@angular/forms';
import { FSLine } from '../../../models/f-s-line';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profit-and-loss',
  imports: [FormsModule, RouterLink],
  templateUrl: './profit-and-loss.component.html',
  styleUrl: './profit-and-loss.component.css'
})
export class ProfitAndLossComponent implements OnInit {

  public revenueList: FSLine[] = [];
  public otherRevenueList: FSLine[] = [];
  public expenseList: FSLine[] = [];
  public otherExpenseList: FSLine[] = [];

  public revenue: number = 0;
  public otherRevenue: number = 0;
  public expense: number = 0;
  public otherExpense: number = 0;
  public netProfit: number = 0;

  filter = {
    startDate: '',
    endDate: ''
  }

  constructor(private readonly service: ReportsService) {}

  ngOnInit(): void {
    this.retrievePLData();
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

    const dates = {
      startDate: this.filter.startDate,
      endDate: this.filter.endDate
    };

    this.service.retrievePLData(dates)
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
