package org.uwcount.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InvoiceLine {
    private Integer id;
    private Integer productId;
    private String description;
    private Double rate;
    private Double quantity;
    private Double amount;
    private Boolean taxable;
    private Integer invoiceId;
}

