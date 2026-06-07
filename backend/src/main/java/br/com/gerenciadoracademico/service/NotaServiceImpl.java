package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Nota;
import br.com.gerenciadoracademico.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class NotaServiceImpl implements NotaService {

    private final NotaRepository notaRepository;

    public NotaServiceImpl(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @Override
    public Nota createNota(Nota nota) {
        nota.setMediaFinal(calcularMedia(nota));
        return notaRepository.save(nota);
    }

    @Override
    public Nota getNotaById(String id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Nota não encontrada: " + id));
    }

    @Override
    public Nota getNotaByMatricula(String matriculaId) {
        return notaRepository.findByMatriculaId(matriculaId)
                .orElseThrow(() -> new NoSuchElementException("Nota não encontrada para matrícula: " + matriculaId));
    }

    @Override
    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }

    @Override
    public List<Nota> getNotasByAluno(String alunoId) {
        return notaRepository.findByMatricula_AlunoId(alunoId);
    }

    @Override
    public Nota updateNota(String id, Nota nota) {
        Nota existing = getNotaById(id);
        existing.setNota1(nota.getNota1());
        existing.setNota2(nota.getNota2());
        existing.setNota3(nota.getNota3());
        existing.setFrequencia(nota.getFrequencia());
        existing.setMediaFinal(calcularMedia(existing));
        return notaRepository.save(existing);
    }

    @Override
    public void deleteNota(String id) {
        notaRepository.deleteById(id);
    }

    private BigDecimal calcularMedia(Nota nota) {
        BigDecimal n1 = nota.getNota1() != null ? nota.getNota1() : BigDecimal.ZERO;
        BigDecimal n2 = nota.getNota2() != null ? nota.getNota2() : BigDecimal.ZERO;
        BigDecimal n3 = nota.getNota3() != null ? nota.getNota3() : BigDecimal.ZERO;
        return n1.add(n2).add(n3)
                .divide(BigDecimal.valueOf(3), 2, RoundingMode.HALF_UP);
    }
}
