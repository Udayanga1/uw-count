package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
}
