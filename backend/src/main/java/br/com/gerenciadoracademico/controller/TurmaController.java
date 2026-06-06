package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Turma;
import br.com.gerenciadoracademico.service.TurmaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/turmas")
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping
    public ResponseEntity<Turma> createTurma(@RequestBody Turma turma) {
        return new ResponseEntity<>(turmaService.createTurma(turma), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> getTurmaById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(turmaService.getTurmaById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Turma>> getAllTurmas() {
        return ResponseEntity.ok(turmaService.getAllTurmas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turma> updateTurma(@PathVariable String id, @RequestBody Turma turma) {
        try {
            return ResponseEntity.ok(turmaService.updateTurma(id, turma));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTurma(@PathVariable String id) {
        turmaService.deleteTurma(id);
        return ResponseEntity.noContent().build();
    }
}
