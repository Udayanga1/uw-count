package org.uwcount.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Bill {
    private Integer id;
    private Integer supplierId;
    private String invoiceNo;
    private LocalDate date;
    private LocalDate dueDate;
    private Double subTotal;
    private Double discount;
    private Double tax;
    private Double payableBal;
    private List<BillTransaction> billTransactions;
}
