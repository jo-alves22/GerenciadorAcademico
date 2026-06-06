package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Disciplina;
import br.com.gerenciadoracademico.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DisciplinaServiceImpl implements DisciplinaService {

    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaServiceImpl(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    @Override
    public Disciplina createDisciplina(Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    @Override
    public Disciplina getDisciplinaById(String id) {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Disciplina não encontrada: " + id));
    }

    @Override
    public List<Disciplina> getAllDisciplinas() {
        return disciplinaRepository.findAll();
    }

    @Override
    public Disciplina updateDisciplina(String id, Disciplina disciplina) {
        Disciplina existing = getDisciplinaById(id);
        existing.setCurso(disciplina.getCurso());
        existing.setNome(disciplina.getNome());
        existing.setCodigo(disciplina.getCodigo());
        existing.setCreditos(disciplina.getCreditos());
        existing.setCargaHoraria(disciplina.getCargaHoraria());
        return disciplinaRepository.save(existing);
    }

    @Override
    public void deleteDisciplina(String id) {
        disciplinaRepository.deleteById(id);
    }
}
