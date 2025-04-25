package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.BillTransactionEntity;

public interface BillTransactionRepository extends JpaRepository<BillTransactionEntity, Integer> {

}
