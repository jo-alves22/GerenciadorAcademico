package br.com.gerenciadoracademico.repository;

import br.com.gerenciadoracademico.entity.Usuario;
import br.com.gerenciadoracademico.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
    List<Usuario> findByTipo(TipoUsuario tipo);
}
