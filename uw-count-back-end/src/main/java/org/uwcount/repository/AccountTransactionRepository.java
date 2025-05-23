package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.AccountTransactionEntity;

public interface AccountTransactionRepository extends JpaRepository<AccountTransactionEntity, Integer> {
}
