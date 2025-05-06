package org.uwcount.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    private Integer id;
    private String name;
    private String address;
    private String email;
    private String contactNo;
    private Double balancePayable;
}
