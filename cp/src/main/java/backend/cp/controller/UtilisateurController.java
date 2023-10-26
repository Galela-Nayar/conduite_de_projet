package backend.cp.controller;

import backend.cp.modele.Utilisateur;
import backend.cp.repository.UtilisateurRepository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    @Autowired
    UtilisateurRepository utilisateurRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createUtilisateur(
        @RequestParam String nom,
        @RequestParam String prenom,
        @RequestParam String username,
        @RequestParam String password,
        @RequestParam String email,
        @RequestParam String description
    ) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(UUID.randomUUID());
        utilisateur.setNom(nom);
        utilisateur.setPrenom(prenom);
        utilisateur.setUserName(username);
        utilisateur.setPassword(password);
        utilisateur.setMail(email);
        utilisateur.setBio(description);

        utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok("Entité Utilisateur créée avec succès.");
    }

}
