package br.com.gerenciadoracademico.entity;

import br.com.gerenciadoracademico.enums.StatusAluno;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "alunos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, length = 36)
    private String id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;

    @Column(nullable = false, unique = true, length = 20)
    private String matricula;

    @Column(name = "data_ingresso", nullable = false)
    private LocalDate dataIngresso;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusAluno status;
}
