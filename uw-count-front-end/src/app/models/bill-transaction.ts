export interface BillTransaction {
  id: number|null;
  accountId: number;
  description: string;
  date: string;
  qty: number;
  unitPrice: number;
  amount: number;
  billId: number|null;
}