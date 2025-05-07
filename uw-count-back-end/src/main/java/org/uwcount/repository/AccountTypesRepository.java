package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.AccountTypesEntity;

public interface AccountTypesRepository extends JpaRepository<AccountTypesEntity, Integer> {
}
