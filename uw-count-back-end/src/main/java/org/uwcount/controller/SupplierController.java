package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Supplier;
import org.uwcount.service.SupplierService;

import java.util.List;

@RestController
@RequestMapping("/supplier")
@RequiredArgsConstructor
@CrossOrigin
public class SupplierController {
    final SupplierService service;

    @PostMapping("/add")
    public ResponseEntity<Supplier> add(@RequestBody Supplier supplier) {
        Supplier created = service.addSupplier(supplier);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Supplier>> getAll(){
        return ResponseEntity.ok(service.getAllSuppliers());
    }

    @GetMapping("/search/email/{email}")
    public ResponseEntity<Supplier> findByEmail(@PathVariable String email) {
        Supplier found = service.getSupplierByEmail(email);
        return ResponseEntity.ok(found);
    }

    @GetMapping("/search/contact/{contact}")
    public ResponseEntity<Supplier> findByContactNo(@PathVariable String contact) {
        Supplier found = service.getSupplierByContactNo(contact);
        return ResponseEntity.ok(found);
    }
}
