package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Matricula;
import br.com.gerenciadoracademico.enums.SituacaoMatricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatriculaRepository extends JpaRepository<Matricula, String> {
    List<Matricula> findByAlunoId(String alunoId);
    List<Matricula> findByTurmaId(String turmaId);
    List<Matricula> findBySituacao(SituacaoMatricula situacao);
    boolean existsByAlunoIdAndTurmaId(String alunoId, String turmaId);
}
