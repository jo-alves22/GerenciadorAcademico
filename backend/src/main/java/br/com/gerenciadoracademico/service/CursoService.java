package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Curso;

import java.util.List;

public interface CursoService {
    Curso createCurso(Curso curso);
    Curso getCursoById(String id);
    List<Curso> getAllCursos();
    Curso updateCurso(String id, Curso curso);
    void deleteCurso(String id);
}
