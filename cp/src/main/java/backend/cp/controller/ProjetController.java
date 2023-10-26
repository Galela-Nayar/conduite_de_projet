package backend.cp.controller;

import backend.cp.modele.Projet;
import backend.cp.repository.ProjetRepository;
import backend.cp.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/projets")
public class ProjetController {


    @Autowired
    private ProjetRepository projetRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createProjet(
        @RequestParam String nom,
        @RequestParam String createur,
        @RequestParam Date date,
        @RequestParam String description,
        @RequestParam Date dateButtoire
        ) {
            Projet projet = new Projet();
            projet.setNom(nom);
            projet.setCreateur(createur);
            projet.setDateCreation(date);
            projet.setDateButtoire(dateButtoire);
            projet.setDescription(description);
            projetRepository.save(projet);
        return ResponseEntity.ok("projet creer");
    }


}
