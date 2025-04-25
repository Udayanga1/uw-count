package org.uwcount.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BillTransaction {
    private Integer id;
    private Integer accountId;
    private String description;
    private LocalDate date;
    private Double qty;
    private Double unitPrice;
    private Double amount;
    private Integer billId;
}
