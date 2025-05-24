package org.uwcount.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class AccountTransactionSummary {
    Integer accountId;
    Double totalAmount;
}
