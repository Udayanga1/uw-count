package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Invoice;
import org.uwcount.service.InvoiceService;

import java.util.List;

@RestController
@RequestMapping("/invoice")
@RequiredArgsConstructor
@CrossOrigin
public class InvoiceController {
    private final InvoiceService service;

    @PostMapping("/add")
    public ResponseEntity<Invoice> add(@RequestBody Invoice invoice) {
        Invoice created = service.createInvoice(invoice);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Invoice>> getAll() {
        return ResponseEntity.ok(service.getAllInvoices());
    }
}
