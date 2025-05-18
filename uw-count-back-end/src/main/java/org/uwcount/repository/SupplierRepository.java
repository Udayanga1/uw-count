package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.SupplierEntity;

public interface SupplierRepository extends JpaRepository<SupplierEntity, Integer> {
    SupplierEntity findByEmail(String email);

    SupplierEntity findByContactNo(String contactNo);

    SupplierEntity findByName(String name);
}
