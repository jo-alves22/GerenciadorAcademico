package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Aluno;

import java.util.List;

public interface AlunoService {
    Aluno createAluno(Aluno aluno);
    Aluno getAlunoById(String id);
    List<Aluno> getAllAlunos();
    Aluno updateAluno(String id, Aluno aluno);
    void deleteAluno(String id);
}
