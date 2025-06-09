package org.uwcount.service;

import org.uwcount.dto.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);

    List<Product> getAllProducts();
}
