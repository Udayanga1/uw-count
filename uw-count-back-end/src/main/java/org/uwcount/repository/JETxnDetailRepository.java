package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.JnlTransactionDetailEntity;

public interface JETxnDetailRepository extends JpaRepository<JnlTransactionDetailEntity, Integer> {
}
