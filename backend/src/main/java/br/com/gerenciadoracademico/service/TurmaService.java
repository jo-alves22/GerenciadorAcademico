package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Turma;

import java.util.List;

public interface TurmaService {
    Turma createTurma(Turma turma);
    Turma getTurmaById(String id);
    List<Turma> getAllTurmas();
    Turma updateTurma(String id, Turma turma);
    void deleteTurma(String id);
}
