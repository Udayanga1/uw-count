package org.uwcount.dto;

import lombok.*;
import org.uwcount.util.ScheduleType;

import java.time.LocalDate;

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
    private LocalDate date;
    private Double amount;
}
