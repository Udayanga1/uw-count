import { InvoiceLine } from "./invoice-line";

export interface Invoice {
  id:           number|null;
  customerId:   number;
  invoiceNo:    string;
  date:         string;    // "YYYY-MM-DD"
  dueDate:      string;
  subTotal:     number;
  discount:     number;
  tax:          number;
  total:        number;
  invoiceLines: InvoiceLine[];
}