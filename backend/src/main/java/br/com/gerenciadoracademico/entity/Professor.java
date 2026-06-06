package br.com.gerenciadoracademico.entity;

import br.com.gerenciadoracademico.enums.Titulacao;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, length = 36)
    private String id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(nullable = false, unique = true, length = 50)
    private String registro;

    @Column(length = 100)
    private String departamento;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Titulacao titulacao;
}
