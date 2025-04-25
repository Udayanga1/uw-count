package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.uwcount.entity.BillEntity;

public interface BillRepository extends JpaRepository<BillEntity, Integer> {

}
