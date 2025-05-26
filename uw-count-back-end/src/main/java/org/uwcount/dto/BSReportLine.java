package org.uwcount.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BSReportLine {
    private String accName;
    private String accountType;
    private Double amount;
}
