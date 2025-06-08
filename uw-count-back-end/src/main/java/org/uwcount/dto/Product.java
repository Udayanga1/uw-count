package org.uwcount.dto;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private Integer id;
    private String code;
    private String name;
    private Integer accountId;
    private Double unitPrice;
}
