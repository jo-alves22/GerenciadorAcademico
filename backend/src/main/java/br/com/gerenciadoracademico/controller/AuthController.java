package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.controller.dto.LoginRequest;
import br.com.gerenciadoracademico.controller.dto.LoginResponse;
import br.com.gerenciadoracademico.entity.Aluno;
import br.com.gerenciadoracademico.enums.TipoUsuario;
import br.com.gerenciadoracademico.repository.AlunoRepository;
import br.com.gerenciadoracademico.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final AlunoRepository alunoRepository;

    public AuthController(UsuarioRepository usuarioRepository, AlunoRepository alunoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.alunoRepository = alunoRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return usuarioRepository.findByEmail(request.email())
                .filter(u -> u.getSenhaHash().equals(request.senha()))
                .map(u -> {
                    String alunoId = null;
                    if (u.getTipo() == TipoUsuario.ALUNO) {
                        alunoId = alunoRepository.findByUsuarioId(u.getId())
                                .map(Aluno::getId)
                                .orElse(null);
                    }
                    return ResponseEntity.ok(new LoginResponse(u.getId(), u.getNome(), u.getEmail(), u.getTipo(), alunoId));
                })
                .orElse(ResponseEntity.status(401).build());
    }
}
