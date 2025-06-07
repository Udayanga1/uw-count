package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
@Table(name = "jnl_txn_detail")
public class JnlTransactionDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "account_code", nullable = false)
    private Integer accountCode;
    private Double amount;
    private String description;

    @ManyToOne
    @JoinColumn(name = "jnl_entry_id", nullable = false)
    private JnlEntryEntity je;
}
