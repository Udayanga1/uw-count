package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.uwcount.entity.BillPaymentTransactionEntity;

public interface BillPaymentTransactionRepository extends JpaRepository<BillPaymentTransactionEntity, Integer> {
    @Query(value = "INSERT INTO bill_payment_transaction_detail ( amount_paying, bill_id, discount_applied, bill_payment_id) VALUES (:amountPaying, :billId, :discount, :billPaymentId)", nativeQuery = true)
    BillPaymentTransactionEntity savePmtTxn(@Param("amountPaying") Double amountPaying, @Param("billId") Integer billId, @Param("discount") Double discount, @Param("billPaymentId") Integer billPaymentId);
}
