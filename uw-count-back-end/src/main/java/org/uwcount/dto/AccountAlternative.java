package org.uwcount.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AccountAlternative {
    private Integer accountCode;
    private String name;
    private String type;
}
