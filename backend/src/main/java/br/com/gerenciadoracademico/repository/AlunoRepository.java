package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Aluno;
import br.com.gerenciadoracademico.enums.StatusAluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, String> {
    Optional<Aluno> findByMatricula(String matricula);
    Optional<Aluno> findByUsuarioId(String usuarioId);
    List<Aluno> findByCursoId(String cursoId);
    List<Aluno> findByStatus(StatusAluno status);
}
