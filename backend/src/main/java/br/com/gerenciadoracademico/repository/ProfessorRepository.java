package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, String> {
    Optional<Professor> findByRegistro(String registro);
    Optional<Professor> findByUsuarioId(String usuarioId);
}
