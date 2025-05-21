package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bill_payment_transaction_detail")
public class BillPaymentTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "billId", nullable = false)
    private Integer billId;
    @Column(name = "amount_paying")
    private Double amountPaying;
    @Column(name = "discount_applied")
    private Double discountApplied;

    @ManyToOne
    @JoinColumn(name = "bill_payment_id", nullable = false)
    private BillPaymentEntity billPayment;
}
