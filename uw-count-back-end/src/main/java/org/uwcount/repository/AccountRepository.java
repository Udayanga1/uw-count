package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    AccountEntity findByAccountCode(Integer code);
}
