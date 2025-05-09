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
    @Temporal(TemporalType.DATE)
    private LocalDate date;

    @Temporal(TemporalType.DATE)
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;
    @Column(name = "sub_total", nullable = false)
    private Double subTotal;
    private Double discount;
    private Double tax;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillTransactionEntity> transactionDetails = new ArrayList<>();
}
