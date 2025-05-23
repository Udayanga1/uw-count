package org.uwcount.dto;

import lombok.*;
import org.uwcount.util.ScheduleType;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AccountTransaction {
    private Integer id;
    private Integer transactionRef;
    private Integer accountId;
    private ScheduleType scheduleType;
    private Double amount;
}
