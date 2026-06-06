package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Professor;

import java.util.List;

public interface ProfessorService {
    Professor createProfessor(Professor professor);
    Professor getProfessorById(String id);
    List<Professor> getAllProfessores();
    Professor updateProfessor(String id, Professor professor);
    void deleteProfessor(String id);
}
