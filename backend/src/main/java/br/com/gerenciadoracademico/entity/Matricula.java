package br.com.gerenciadoracademico.entity;

import br.com.gerenciadoracademico.enums.SituacaoMatricula;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
    name = "matriculas",
    uniqueConstraints = @UniqueConstraint(columnNames = {"aluno_id", "turma_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "turma_id", nullable = false)
    private Turma turma;

    @Column(name = "data_matricula")
    private LocalDate dataMatricula;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SituacaoMatricula situacao;
}
