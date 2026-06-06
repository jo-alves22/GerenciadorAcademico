package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NotaRepository extends JpaRepository<Nota, String> {
    Optional<Nota> findByMatriculaId(String matriculaId);
}
