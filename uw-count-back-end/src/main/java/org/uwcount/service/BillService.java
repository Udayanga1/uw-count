package org.uwcount.service;

import org.uwcount.dto.Bill;
import org.uwcount.dto.BillPayment;

import java.util.List;

public interface BillService {
    Bill addBill(Bill bill);
    List<Bill> getAllBills();
    List<Bill> getAllBillsBySupplier(String supplierName);

    Bill updateBillBal(Bill bill);

    BillPayment payBills(BillPayment billPayment);
}
