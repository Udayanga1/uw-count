package org.uwcount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.uwcount.entity.InvoiceLineEntity;
import java.util.List;

@Repository
public interface InvoiceLineRepository extends JpaRepository<InvoiceLineEntity, Integer> {

}
