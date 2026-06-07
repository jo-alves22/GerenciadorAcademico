package br.com.gerenciadoracademico.controller.dto;

import br.com.gerenciadoracademico.enums.TipoUsuario;

public record LoginResponse(String id, String nome, String email, TipoUsuario tipo, String alunoId) {}
