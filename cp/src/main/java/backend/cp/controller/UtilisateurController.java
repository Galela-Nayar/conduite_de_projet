package backend.cp.controller;

import backend.cp.modele.Utilisateur;
import backend.cp.repository.UtilisateurRepository;
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
        @RequestParam String usernam,
        @RequestParam String email,
        @RequestParam String miniature,
        @RequestParam String description
    ) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(nom);
        utilisateur.setUserName(usernam);
        utilisateur.setMail(email);
        utilisateur.setMiniature(miniature);
        utilisateur.setBio(description);

        utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok("Entité Utilisateur créée avec succès.");
    }

}
