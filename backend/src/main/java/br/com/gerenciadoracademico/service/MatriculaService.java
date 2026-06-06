package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Matricula;

import java.util.List;

public interface MatriculaService {
    Matricula createMatricula(Matricula matricula);
    Matricula getMatriculaById(String id);
    List<Matricula> getAllMatriculas();
    List<Matricula> getMatriculasByAluno(String alunoId);
    List<Matricula> getMatriculasByTurma(String turmaId);
    Matricula updateMatricula(String id, Matricula matricula);
    void deleteMatricula(String id);
}
