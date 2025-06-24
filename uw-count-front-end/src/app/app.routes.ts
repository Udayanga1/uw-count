import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { EnterBillComponent } from './page/vendor/enter-bill/enter-bill.component';
import { PayBillComponent } from './page/vendor/pay-bill/pay-bill.component';
import { CreateInvoiceComponent } from './page/customer/create-invoice/create-invoice.component';
import { ReceivePaymentComponent } from './page/customer/receive-payment/receive-payment.component';
import { CustomerListComponent } from './page/customer/customer-list/customer-list.component';
import { AddVendorComponent } from './page/vendor/add-vendor/add-vendor.component';
import { ChartOfAccountsComponent } from './page/company/chart-of-accounts/chart-of-accounts.component';
import { JournalEntryComponent } from './page/company/journal-entry/journal-entry.component';
import { ProductComponent } from './page/company/product/product.component';
import { ProfitAndLossComponent } from './page/reports/profit-and-loss/profit-and-loss.component';
import { BalanceSheetComponent } from './page/reports/balance-sheet/balance-sheet.component';

export const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path: "suppliers",
    component: AddVendorComponent
  },
  {
    path: "suppliers/enter-bill",
    component: EnterBillComponent
  },
  {
    path: "suppliers/pay-bill",
    component: PayBillComponent
  },
  {
    path: "customers",
    component: CustomerListComponent
  },
  {
    path: "customers/create-invoice",
    component: CreateInvoiceComponent
  },
  {
    path: "customers/receive-payment",
    component: ReceivePaymentComponent
  },
  {
    path: "company/chart-of-accounts",
    component: ChartOfAccountsComponent
  },
  {
    path: "company/enter-journal",
    component: JournalEntryComponent
  },
  {
    path: "company/products",
    component: ProductComponent
  },
  {
    path: "reports/profit-and-loss",
    component: ProfitAndLossComponent
  },
  {
    path: "reports/balance-sheet",
    component: BalanceSheetComponent
  },
];
