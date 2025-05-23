package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.*;
import org.uwcount.util.ScheduleType;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "account_transaction_detail")
public class AccountTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "transaction_ref", nullable = false)
    private Integer transactionRef;

    @Column(name = "account_id", nullable = false)
    private Integer accountId;

    @Enumerated(EnumType.STRING)
    @Column(name = "schedule_type", nullable = false)
    private ScheduleType scheduleType;

    private Double amount;
}
