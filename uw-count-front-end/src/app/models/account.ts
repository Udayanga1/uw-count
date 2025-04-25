export interface Account {
  number: string;
  name:   string;
  type:   'Cash_And_Bank' | 'Current_Asset' | 'Non_Current_Asset' | 'Credit_Card' | 'Current_Liability' | 'Non_Current_Liability' | 'Equity' | 'Revenue' | 'Other_Revenue' | 'Expense' | 'Other_Expense';
}