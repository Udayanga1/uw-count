package org.uwcount.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BillPayment {
    private Integer id;
    private Integer payingAccountId;
    private LocalDate date;
    private Double total;
    private List<BillPaymentTransaction> billPaymentTransaction;
}
