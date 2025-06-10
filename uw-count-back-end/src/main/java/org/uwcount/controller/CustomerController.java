package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Customer;
import org.uwcount.dto.Product;
import org.uwcount.service.CustomerService;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService service;

    @PostMapping("/add")
    public ResponseEntity<Customer> add(@RequestBody Customer customer) {
        Customer created = service.addCustomer(customer);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(service.getAllCustomers());
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> update(@RequestBody Customer customer) {
        Customer updated = service.updateCustomer(customer);
        return ResponseEntity.ok(updated);
    }

}
