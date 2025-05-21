package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.BillPaymentEntity;

public interface BillPaymentRepository extends JpaRepository<BillPaymentEntity, Integer> {
}
