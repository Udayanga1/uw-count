export interface InvoiceLine {
  id:          number|null;
  productId:   number;
  description: string;
  rate:        number;
  quantity:    number;
  amount:      number;
  taxable:     boolean;
  invoiceId:   number|null;
}