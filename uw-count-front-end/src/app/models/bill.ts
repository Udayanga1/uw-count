import { BillTransaction } from "./bill-transaction";

export interface Bill {
  id: number|null;
  supplierId: number;
  invoiceNo: string;
  date: string;
  dueDate: string;
  subTotal: number;
  discount: number;
  tax: number;
  billTransactions: BillTransaction[];
}