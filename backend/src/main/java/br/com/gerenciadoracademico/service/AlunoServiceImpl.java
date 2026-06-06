package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Aluno;
import br.com.gerenciadoracademico.repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AlunoServiceImpl implements AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoServiceImpl(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @Override
    public Aluno createAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    @Override
    public Aluno getAlunoById(String id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Aluno não encontrado: " + id));
    }

    @Override
    public List<Aluno> getAllAlunos() {
        return alunoRepository.findAll();
    }

    @Override
    public Aluno updateAluno(String id, Aluno aluno) {
        Aluno existing = getAlunoById(id);
        existing.setUsuario(aluno.getUsuario());
        existing.setCurso(aluno.getCurso());
        existing.setMatricula(aluno.getMatricula());
        existing.setDataIngresso(aluno.getDataIngresso());
        existing.setStatus(aluno.getStatus());
        return alunoRepository.save(existing);
    }

    @Override
    public void deleteAluno(String id) {
        alunoRepository.deleteById(id);
    }
}
