package org.uwcount.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BillPaymentTransaction {
    private Integer id;
    private Integer paymentId;
    private Integer billId;
    private Double amountPaying;
    private Double discountApplied;
}
