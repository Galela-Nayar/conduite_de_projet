package backend.cp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.cp.modele.Equipe;
import backend.cp.repository.EquipeRepository;
import backend.cp.service.EquipeService;

@RestController
@RequestMapping("/equipe")
public class EquipeController {

    @Autowired
    private EquipeService equipeService;

    public EquipeController(EquipeService equipeService) {
        this.equipeService = equipeService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createEquipe(
            @RequestParam String name,
            @RequestParam String color
    ) {
        
        equipeService.createEquipe(name, color);
        return ResponseEntity.ok("Entité Equipe créée avec succès.");
    }
}
