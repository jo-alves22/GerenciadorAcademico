package br.com.gerenciadoracademico.controller;

import br.com.gerenciadoracademico.entity.Nota;
import br.com.gerenciadoracademico.service.NotaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("api/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota) {
        return new ResponseEntity<>(notaService.createNota(nota), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(notaService.getNotaById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/matricula/{matriculaId}")
    public ResponseEntity<Nota> getNotaByMatricula(@PathVariable String matriculaId) {
        try {
            return ResponseEntity.ok(notaService.getNotaByMatricula(matriculaId));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Nota>> getAllNotas() {
        return ResponseEntity.ok(notaService.getAllNotas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable String id, @RequestBody Nota nota) {
        try {
            return ResponseEntity.ok(notaService.updateNota(id, nota));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable String id) {
        notaService.deleteNota(id);
        return ResponseEntity.noContent().build();
    }
}
