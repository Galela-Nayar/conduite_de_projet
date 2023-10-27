package backend.cp.controller;

import backend.cp.modele.Projet;
import backend.cp.repository.ProjetRepository;
import backend.cp.service.ProjetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/projets")
public class ProjetController {


    @Autowired
    private ProjetService projetService;

    public ProjetController(ProjetService projetService) {
        this.projetService = projetService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createProjet(
        @RequestParam String nom,
        @RequestParam String createur,
        @RequestParam Date date,
        @RequestParam String description,
        @RequestParam Date dateButtoire
        ) {
            projetService.createProjet(nom, createur, description, dateButtoire);
        return ResponseEntity.ok("projet creer");
    }


}
