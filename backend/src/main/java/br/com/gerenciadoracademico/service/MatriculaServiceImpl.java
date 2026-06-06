package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Matricula;
import br.com.gerenciadoracademico.repository.MatriculaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MatriculaServiceImpl implements MatriculaService {

    private final MatriculaRepository matriculaRepository;

    public MatriculaServiceImpl(MatriculaRepository matriculaRepository) {
        this.matriculaRepository = matriculaRepository;
    }

    @Override
    public Matricula createMatricula(Matricula matricula) {
        if (matriculaRepository.existsByAlunoIdAndTurmaId(
                matricula.getAluno().getId(), matricula.getTurma().getId())) {
            throw new IllegalStateException("Aluno já matriculado nesta turma.");
        }
        if (matricula.getDataMatricula() == null) {
            matricula.setDataMatricula(LocalDate.now());
        }
        return matriculaRepository.save(matricula);
    }

    @Override
    public Matricula getMatriculaById(String id) {
        return matriculaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Matrícula não encontrada: " + id));
    }

    @Override
    public List<Matricula> getAllMatriculas() {
        return matriculaRepository.findAll();
    }

    @Override
    public List<Matricula> getMatriculasByAluno(String alunoId) {
        return matriculaRepository.findByAlunoId(alunoId);
    }

    @Override
    public List<Matricula> getMatriculasByTurma(String turmaId) {
        return matriculaRepository.findByTurmaId(turmaId);
    }

    @Override
    public Matricula updateMatricula(String id, Matricula matricula) {
        Matricula existing = getMatriculaById(id);
        existing.setSituacao(matricula.getSituacao());
        return matriculaRepository.save(existing);
    }

    @Override
    public void deleteMatricula(String id) {
        matriculaRepository.deleteById(id);
    }
}
