package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.JnlEntryEntity;

public interface JERepository extends JpaRepository<JnlEntryEntity, Integer> {
}
