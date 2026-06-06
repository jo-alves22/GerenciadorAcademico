package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Usuario;
import br.com.gerenciadoracademico.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario getUsuarioById(String id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado: " + id));
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario updateUsuario(String id, Usuario usuario) {
        Usuario existing = getUsuarioById(id);
        existing.setNome(usuario.getNome());
        existing.setEmail(usuario.getEmail());
        if (usuario.getSenhaHash() != null && !usuario.getSenhaHash().isBlank()) {
            existing.setSenhaHash(usuario.getSenhaHash());
        }
        existing.setTipo(usuario.getTipo());
        return usuarioRepository.save(existing);
    }

    @Override
    public void deleteUsuario(String id) {
        usuarioRepository.deleteById(id);
    }
}
