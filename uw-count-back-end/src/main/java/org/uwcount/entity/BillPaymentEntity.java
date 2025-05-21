package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bill_payment")
public class BillPaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "paying_account_id", nullable = false)
    private Integer payingAccountId;
    @Column(nullable = false)
    private LocalDate date;
    private Double total;

    @OneToMany(mappedBy = "billPayment", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillPaymentTransactionEntity> billPaymentTransaction = new ArrayList<>();
}
