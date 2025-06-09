package org.uwcount.dto;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    private Integer id;
    private String name;
    private String address;
    private String email;
    private String contactNo;
    private Double balanceReceivable;
}
