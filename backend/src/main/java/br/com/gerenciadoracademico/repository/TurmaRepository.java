package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, String> {
    List<Turma> findByDisciplinaId(String disciplinaId);
    List<Turma> findByProfessorId(String professorId);
    List<Turma> findByPeriodoAndAno(String periodo, Integer ano);
}
