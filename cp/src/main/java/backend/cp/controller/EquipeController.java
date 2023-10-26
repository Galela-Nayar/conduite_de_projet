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

@RestController
@RequestMapping("/equipe")
public class EquipeController {

    @Autowired
    private EquipeRepository equipeRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createEquipe(
            @RequestParam String name,
            @RequestParam String color,
            @RequestParam List<String> colaborateur
    ) {
        Equipe equipe = new Equipe();
        equipe.setName(name);
        equipe.setColor(color);
        equipe.setColaborateur(colaborateur);

        equipeRepository.save(equipe);

        return ResponseEntity.ok("Entité Equipe créée avec succès.");
    }
}
