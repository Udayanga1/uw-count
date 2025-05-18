package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.dto.Bill;
import org.uwcount.entity.BillEntity;

import java.util.List;

public interface BillRepository extends JpaRepository<BillEntity, Integer> {

    List<BillEntity> findBySupplierId(Integer supplierId);
}
