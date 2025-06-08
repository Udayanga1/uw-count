package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.uwcount.dto.Product;
import org.uwcount.entity.AccountEntity;
import org.uwcount.entity.ProductEntity;
import org.uwcount.repository.AccountRepository;
import org.uwcount.repository.ProductRepository;
import org.uwcount.service.ProductService;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final AccountRepository accountRepository;
    private final ProductRepository productRepository;
    private final ModelMapper mapper;

    @Override
    public Product addProduct(Product product) {
        AccountEntity accountEntity = accountRepository.findByAccountCode(product.getAccountId());
        if (accountEntity.getId()>0) {
            product.setAccountId(accountEntity.getId());
            ProductEntity saved = productRepository.save(mapper.map(product, ProductEntity.class));
            return mapper.map(saved, Product.class);
        }
        return null;
    }
}
