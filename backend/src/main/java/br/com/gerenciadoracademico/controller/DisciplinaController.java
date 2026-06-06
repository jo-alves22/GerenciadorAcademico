package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Disciplina;
import br.com.gerenciadoracademico.service.DisciplinaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/disciplinas")
public class DisciplinaController {

    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping
    public ResponseEntity<Disciplina> createDisciplina(@RequestBody Disciplina disciplina) {
        return new ResponseEntity<>(disciplinaService.createDisciplina(disciplina), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disciplina> getDisciplinaById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(disciplinaService.getDisciplinaById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Disciplina>> getAllDisciplinas() {
        return ResponseEntity.ok(disciplinaService.getAllDisciplinas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disciplina> updateDisciplina(@PathVariable String id, @RequestBody Disciplina disciplina) {
        try {
            return ResponseEntity.ok(disciplinaService.updateDisciplina(id, disciplina));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisciplina(@PathVariable String id) {
        disciplinaService.deleteDisciplina(id);
        return ResponseEntity.noContent().build();
    }
}
