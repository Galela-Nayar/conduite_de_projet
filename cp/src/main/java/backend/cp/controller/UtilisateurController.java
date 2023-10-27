package backend.cp.controller;

import backend.cp.modele.Utilisateur;
import backend.cp.repository.UtilisateurRepository;
import backend.cp.service.UtilisateurService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @Autowired
    public UtilisateurController(UtilisateurService sectionService) {
        this.utilisateurService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUtilisateur(
        @RequestParam String nom,
        @RequestParam String prenom,
        @RequestParam String username,
        @RequestParam String password,
        @RequestParam String email
    ) {
        utilisateurService.createUtilisateur(nom, prenom, username, password, email);
        return ResponseEntity.ok("Entité Utilisateur créée avec succès.");
    }

}
