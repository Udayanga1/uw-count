package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bill")
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "supplier_id", nullable = false)
    private Integer supplierId;
    @Column(name = "invoice_no", nullable = false)
    private String invoiceNo;
    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;
    @Column(name = "sub_total", nullable = false)
    private Double subTotal;
    private Double discount;
    private Double tax;
    @Column(name = "payable_bal")
    private Double payableBal;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillTransactionEntity> transactionDetails = new ArrayList<>();
}
