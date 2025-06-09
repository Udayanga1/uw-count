package org.uwcount.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.uwcount.dto.Account;
import org.uwcount.dto.Product;
import org.uwcount.entity.AccountEntity;
import org.uwcount.entity.ProductEntity;
import org.uwcount.repository.AccountRepository;
import org.uwcount.repository.ProductRepository;
import org.uwcount.service.ProductService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<Product> getAllProducts() {
        List<ProductEntity> productEntities = productRepository.findAll();
        List<AccountEntity> accountEntities = accountRepository.findAll();
        List<Product> productList = new ArrayList<>();

        for (ProductEntity productEntity: productEntities) {
            accountEntities.forEach(accountEntity -> {
                if (productEntity.getAccountId() == accountEntity.getId()) {
                    productEntity.setAccountId(accountEntity.getAccountCode());
                }
            });
            productList.add(mapper.map(productEntity, Product.class));
        }
        return productList;
    }
}
