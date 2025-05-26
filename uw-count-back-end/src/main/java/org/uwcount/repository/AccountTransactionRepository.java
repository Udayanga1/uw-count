package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.uwcount.dto.AccountTransactionSummary;
import org.uwcount.entity.AccountEntity;
import org.uwcount.entity.AccountTransactionEntity;

import java.time.LocalDate;
import java.util.List;

public interface AccountTransactionRepository extends JpaRepository<AccountTransactionEntity, Integer> {

    @Query(value = """
        SELECT account_id AS accountId, SUM(amount) AS totalAmount 
        FROM account_transaction_detail 
        WHERE date >= :startDate AND date <= :endDate 
        GROUP BY account_id
        """, nativeQuery = true)
    List<AccountTransactionSummary> findTotalAmountByAccountBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query(value = """
        SELECT account_id AS accountId, SUM(amount) AS totalAmount 
        FROM account_transaction_detail 
        WHERE date <= :reportDate 
        GROUP BY account_id
        """, nativeQuery = true)
    List<AccountTransactionSummary> findBalanceByAccountAtDate(@Param("reportDate") LocalDate reportDate);
}
