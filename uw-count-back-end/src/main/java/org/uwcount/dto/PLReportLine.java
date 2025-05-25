package org.uwcount.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PLReportLine {
    private String accName;
    private String accountType;
    private Double amount;
}
