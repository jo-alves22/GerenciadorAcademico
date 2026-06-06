package br.com.gerenciadoracademico.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "notas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, length = 36)
    private String id;

    @OneToOne
    @JoinColumn(name = "matricula_id", nullable = false, unique = true)
    private Matricula matricula;

    @Column(name = "nota_1", precision = 5, scale = 2)
    private BigDecimal nota1;

    @Column(name = "nota_2", precision = 5, scale = 2)
    private BigDecimal nota2;

    @Column(name = "nota_3", precision = 5, scale = 2)
    private BigDecimal nota3;

    @Column(name = "media_final", precision = 5, scale = 2)
    private BigDecimal mediaFinal;

    @Column(precision = 5, scale = 2)
    private BigDecimal frequencia;
}
