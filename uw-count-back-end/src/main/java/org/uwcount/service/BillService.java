package org.uwcount.service;

import org.uwcount.dto.Bill;

import java.util.List;

public interface BillService {
    Bill addBill(Bill bill);
    List<Bill> getAllBills();
}
