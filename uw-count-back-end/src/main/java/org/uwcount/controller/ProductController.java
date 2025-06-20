package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.Product;
import org.uwcount.service.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/product")
public class ProductController {
    private final ProductService service;

    @PostMapping("/add")
    public ResponseEntity<Product> add(@RequestBody Product product) {
        Product created = service.addProduct(product);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(service.getAllProducts());
    }
}
