package backend.cp.controller;

import backend.cp.modele.Label;
import backend.cp.service.LabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/labels")
public class LabelController {

    @Autowired
    private LabelService labelService;

    @GetMapping
    public List<Label> getAllLabels() {
        return labelService.getAllLabels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Label> getLabelById(@PathVariable String id) {
        Optional<Label> label = labelService.getLabelById(id);
        return label.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Label> createLabel(@RequestBody Label label) {
        Label createdLabel = labelService.createLabel(label);
        return ResponseEntity.ok(createdLabel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Label> updateLabel(@PathVariable String id, @RequestBody Label updatedLabel) {
        try {
            Label label = labelService.updateLabel(id, updatedLabel);
            return ResponseEntity.ok(label);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabel(@PathVariable String id) {
        labelService.deleteLabel(id);
        return ResponseEntity.noContent().build();
    }
}
