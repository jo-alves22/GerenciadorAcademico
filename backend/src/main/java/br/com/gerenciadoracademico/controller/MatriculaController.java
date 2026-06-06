package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Matricula;
import br.com.gerenciadoracademico.service.MatriculaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/matriculas")
public class MatriculaController {

    private final MatriculaService matriculaService;

    public MatriculaController(MatriculaService matriculaService) {
        this.matriculaService = matriculaService;
    }

    @PostMapping
    public ResponseEntity<?> createMatricula(@RequestBody Matricula matricula) {
        try {
            return new ResponseEntity<>(matriculaService.createMatricula(matricula), HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matricula> getMatriculaById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(matriculaService.getMatriculaById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Matricula>> getAllMatriculas() {
        return ResponseEntity.ok(matriculaService.getAllMatriculas());
    }

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<Matricula>> getByAluno(@PathVariable String alunoId) {
        return ResponseEntity.ok(matriculaService.getMatriculasByAluno(alunoId));
    }

    @GetMapping("/turma/{turmaId}")
    public ResponseEntity<List<Matricula>> getByTurma(@PathVariable String turmaId) {
        return ResponseEntity.ok(matriculaService.getMatriculasByTurma(turmaId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Matricula> updateMatricula(@PathVariable String id, @RequestBody Matricula matricula) {
        try {
            return ResponseEntity.ok(matriculaService.updateMatricula(id, matricula));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatricula(@PathVariable String id) {
        matriculaService.deleteMatricula(id);
        return ResponseEntity.noContent().build();
    }
}
