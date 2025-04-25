package org.uwcount.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Invoice {
    private Integer id;
    private Integer customerId;
    private String invoiceNo;
    private LocalDate date;
    private LocalDate dueDate;
    private Double subTotal;
    private Double discount;
    private Double tax;
    private Double total;
    private List<InvoiceLine> invoiceLines;
}
