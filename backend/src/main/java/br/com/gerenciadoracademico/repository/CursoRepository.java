package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CursoRepository extends JpaRepository<Curso, String> {
    Optional<Curso> findByCodigo(String codigo);
    List<Curso> findByAtivo(Boolean ativo);
}
