package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.uwcount.dto.Bill;
import org.uwcount.entity.BillEntity;

import java.util.List;

public interface BillRepository extends JpaRepository<BillEntity, Integer> {

    List<BillEntity> findBySupplierId(Integer supplierId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE bill SET payable_bal = payable_bal - :bal_reduction WHERE id = :billId", nativeQuery = true)
    void updateBal(@Param("bal_reduction") Double balanceReduction, @Param("billId") Integer billId);
}
