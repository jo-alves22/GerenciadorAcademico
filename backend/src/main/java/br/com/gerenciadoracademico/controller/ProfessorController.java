package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Professor;
import br.com.gerenciadoracademico.service.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/professores")
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @PostMapping
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor professor) {
        return new ResponseEntity<>(professorService.createProfessor(professor), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> getProfessorById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(professorService.getProfessorById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Professor>> getAllProfessores() {
        return ResponseEntity.ok(professorService.getAllProfessores());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable String id, @RequestBody Professor professor) {
        try {
            return ResponseEntity.ok(professorService.updateProfessor(id, professor));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable String id) {
        professorService.deleteProfessor(id);
        return ResponseEntity.noContent().build();
    }
}
