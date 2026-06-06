package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Curso;
import br.com.gerenciadoracademico.repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CursoServiceImpl implements CursoService {

    private final CursoRepository cursoRepository;

    public CursoServiceImpl(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public Curso createCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    @Override
    public Curso getCursoById(String id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Curso não encontrado: " + id));
    }

    @Override
    public List<Curso> getAllCursos() {
        return cursoRepository.findAll();
    }

    @Override
    public Curso updateCurso(String id, Curso curso) {
        Curso existing = getCursoById(id);
        existing.setNome(curso.getNome());
        existing.setCodigo(curso.getCodigo());
        existing.setDescricao(curso.getDescricao());
        existing.setCargaHoraria(curso.getCargaHoraria());
        existing.setAtivo(curso.getAtivo());
        return cursoRepository.save(existing);
    }

    @Override
    public void deleteCurso(String id) {
        cursoRepository.deleteById(id);
    }
}
