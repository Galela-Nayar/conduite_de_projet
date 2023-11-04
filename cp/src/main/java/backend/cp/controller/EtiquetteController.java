package backend.cp.controller;

import backend.cp.modele.Etiquette;
import backend.cp.service.EtiquetteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/etiquettes")
public class EtiquetteController {

    @Autowired
    private EtiquetteService etiquetteService;

    @GetMapping
    public List<Etiquette> getAllEtiquettes() {
        return etiquetteService.getAllEtiquettes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etiquette> getEtiquetteById(@PathVariable String id) {
        Optional<Etiquette> etiquette = etiquetteService.getEtiquetteById(id);
        return etiquette.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Etiquette> createEtiquette(@RequestBody Etiquette etiquette) {
        Etiquette createdEtiquette = etiquetteService.createEtiquette(etiquette);
        return ResponseEntity.ok(createdEtiquette);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etiquette> updateEtiquette(@PathVariable String id, @RequestBody Etiquette updatedEtiquette) {
        try {
            Etiquette etiquette = etiquetteService.updateEtiquette(id, updatedEtiquette);
            return ResponseEntity.ok(etiquette);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtiquette(@PathVariable String id) {
        etiquetteService.deleteEtiquette(id);
        return ResponseEntity.noContent().build();
    }
}
