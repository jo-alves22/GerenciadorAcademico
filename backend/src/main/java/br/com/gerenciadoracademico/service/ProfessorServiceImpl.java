package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Professor;
import br.com.gerenciadoracademico.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorServiceImpl(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    @Override
    public Professor createProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    @Override
    public Professor getProfessorById(String id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Professor não encontrado: " + id));
    }

    @Override
    public List<Professor> getAllProfessores() {
        return professorRepository.findAll();
    }

    @Override
    public Professor updateProfessor(String id, Professor professor) {
        Professor existing = getProfessorById(id);
        existing.setUsuario(professor.getUsuario());
        existing.setRegistro(professor.getRegistro());
        existing.setDepartamento(professor.getDepartamento());
        existing.setTitulacao(professor.getTitulacao());
        return professorRepository.save(existing);
    }

    @Override
    public void deleteProfessor(String id) {
        professorRepository.deleteById(id);
    }
}
