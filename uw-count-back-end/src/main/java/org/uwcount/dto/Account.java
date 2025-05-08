package org.uwcount.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    private Integer id;
    private Integer accountCode;
    private String name;
    private Integer typeId;
}
