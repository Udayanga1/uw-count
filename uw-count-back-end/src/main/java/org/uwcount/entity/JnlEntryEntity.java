package org.uwcount.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@Table(name = "jnl_entry")
public class JnlEntryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String narration;
    @Column(nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "je", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JnlTransactionDetailEntity> jnlLines = new ArrayList<>();
}
