package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "supplier")
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true)
    private String name;
    private String address;
    @Column(unique = true)
    private String email;
    @Column(name = "contact_no", unique = true)
    private String contactNo;
    private Double balancePayable;
}
