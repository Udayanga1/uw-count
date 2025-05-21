export interface BillPmtTransaction {
  id: number | null,
  paymentId: number | null,
  billId: number,
  amountPaying: number,
  discountApplied: number
}