package br.com.gerenciadoracademico.service;

import br.com.gerenciadoracademico.entity.Nota;

import java.util.List;

public interface NotaService {
    Nota createNota(Nota nota);
    Nota getNotaById(String id);
    Nota getNotaByMatricula(String matriculaId);
    List<Nota> getAllNotas();
    Nota updateNota(String id, Nota nota);
    void deleteNota(String id);
}
