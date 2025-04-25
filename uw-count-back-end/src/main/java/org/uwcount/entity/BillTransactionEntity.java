package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bill_transaction_detail")
public class BillTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "account_id", nullable = false)
    private Integer accountId;
    private String description;
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate date;
    @Column(nullable = false)
    private Double qty;
    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;
    @Column(nullable = false)
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private BillEntity bill;
}
