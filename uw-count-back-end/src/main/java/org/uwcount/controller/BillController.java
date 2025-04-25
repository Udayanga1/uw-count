package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Bill;
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
}
