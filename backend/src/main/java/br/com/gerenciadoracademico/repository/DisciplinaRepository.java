package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DisciplinaRepository extends JpaRepository<Disciplina, String> {
    Optional<Disciplina> findByCodigo(String codigo);
    List<Disciplina> findByCursoId(String cursoId);
}
