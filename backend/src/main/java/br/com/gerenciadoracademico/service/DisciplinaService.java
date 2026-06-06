package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Disciplina;

import java.util.List;

public interface DisciplinaService {
    Disciplina createDisciplina(Disciplina disciplina);
    Disciplina getDisciplinaById(String id);
    List<Disciplina> getAllDisciplinas();
    Disciplina updateDisciplina(String id, Disciplina disciplina);
    void deleteDisciplina(String id);
}
