package org.uwcount.dto;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JnlTransactionDetail {
    private Integer id;
    private Integer accountCode;
    private Double amount;
    private String description;
    private Integer jEId;
}
