package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Bill;
import org.uwcount.dto.BillPayment;
import org.uwcount.service.BillService;

import java.util.List;

@RestController
@RequestMapping("/bill")
@RequiredArgsConstructor
@CrossOrigin
public class BillController {
    private final BillService service;

    @PostMapping("/add")
    public ResponseEntity<Bill> add(@RequestBody Bill bill) {
        Bill created = service.addBill(bill);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Bill>> getAll() {
        return ResponseEntity.ok(service.getAllBills());
    }

    @GetMapping("get-all/{supplier}")
    public ResponseEntity<List<Bill>> getAllBySupplier(@PathVariable  String supplier) {
        return ResponseEntity.ok(service.getAllBillsBySupplier(supplier));
    }

    @PutMapping("/update-bal")
    public ResponseEntity<Bill> update(@RequestBody Bill bill) {
        Bill updated = service.updateBillBal(bill);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/pay-bills")
    public ResponseEntity<BillPayment> payBills(@RequestBody BillPayment billPayment) {
        BillPayment created = service.payBills(billPayment);
        return ResponseEntity.ok(created);
    }
}
