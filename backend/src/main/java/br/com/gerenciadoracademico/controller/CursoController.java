package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Curso;
import br.com.gerenciadoracademico.service.CursoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping
    public ResponseEntity<Curso> createCurso(@RequestBody Curso curso) {
        return new ResponseEntity<>(cursoService.createCurso(curso), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> getCursoById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(cursoService.getCursoById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Curso>> getAllCursos() {
        return ResponseEntity.ok(cursoService.getAllCursos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable String id, @RequestBody Curso curso) {
        try {
            return ResponseEntity.ok(cursoService.updateCurso(id, curso));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable String id) {
        cursoService.deleteCurso(id);
        return ResponseEntity.noContent().build();
    }
}
