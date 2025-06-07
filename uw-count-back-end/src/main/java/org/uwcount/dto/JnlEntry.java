package org.uwcount.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class JnlEntry {
    private Integer id;
    private String narration;
    private LocalDate date;
    private List<JnlTransactionDetail> jeLines;
}
