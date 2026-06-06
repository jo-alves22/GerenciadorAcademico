package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Turma;
import br.com.gerenciadoracademico.repository.TurmaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TurmaServiceImpl implements TurmaService {

    private final TurmaRepository turmaRepository;

    public TurmaServiceImpl(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    @Override
    public Turma createTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    @Override
    public Turma getTurmaById(String id) {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Turma não encontrada: " + id));
    }

    @Override
    public List<Turma> getAllTurmas() {
        return turmaRepository.findAll();
    }

    @Override
    public Turma updateTurma(String id, Turma turma) {
        Turma existing = getTurmaById(id);
        existing.setDisciplina(turma.getDisciplina());
        existing.setProfessor(turma.getProfessor());
        existing.setPeriodo(turma.getPeriodo());
        existing.setAno(turma.getAno());
        existing.setVagas(turma.getVagas());
        return turmaRepository.save(existing);
    }

    @Override
    public void deleteTurma(String id) {
        turmaRepository.deleteById(id);
    }
}
