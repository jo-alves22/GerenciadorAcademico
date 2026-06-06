package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Aluno;
import br.com.gerenciadoracademico.service.AlunoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    public ResponseEntity<Aluno> createAluno(@RequestBody Aluno aluno) {
        return new ResponseEntity<>(alunoService.createAluno(aluno), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAlunoById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(alunoService.getAlunoById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> getAllAlunos() {
        return ResponseEntity.ok(alunoService.getAllAlunos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable String id, @RequestBody Aluno aluno) {
        try {
            return ResponseEntity.ok(alunoService.updateAluno(id, aluno));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable String id) {
        alunoService.deleteAluno(id);
        return ResponseEntity.noContent().build();
    }
}
