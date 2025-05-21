import { BillPmtTransaction } from "./bill-pmt-transaction";

export interface BillPayment {
  id: number | null,
  date: string,
  total: number,
  payingAccountId: number,
  billPaymentTransaction: BillPmtTransaction[]
}