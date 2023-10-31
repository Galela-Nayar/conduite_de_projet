package backend.cp.controller;

import backend.cp.dto.UtilisateurDto;
import backend.cp.modele.Utilisateur;
import backend.cp.service.UtilisateurService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // replace with the domain your frontend is running on
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @Autowired
    public UtilisateurController(UtilisateurService sectionService) {
        this.utilisateurService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
        System.out.println(utilisateurDto.getNom() +"     "+ utilisateurDto.getPrenom()+"     "+ utilisateurDto.getUsername()+"     "+ utilisateurDto.getEmail()+"     "+ utilisateurDto.getPassword());
        if(utilisateurService.existUser(utilisateurDto.getEmail()) == true){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exist.");
        }
        if(utilisateurService.existUserName(utilisateurDto.getUsername()) == true){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exist.");
        }
        utilisateurService.createUtilisateur(utilisateurDto.getNom(), utilisateurDto.getPrenom(), utilisateurDto.getUsername(), utilisateurDto.getEmail(), utilisateurDto.getPassword());
        return ResponseEntity.ok("Entité Utilisateur créée avec succès.");
    }

    @GetMapping("/login")
    public String loginUtilisateur(@RequestParam String email, @RequestParam String password){
        if(utilisateurService.existUser(email) == true){
            return utilisateurService.connectMail(email, password);
        }
        if(utilisateurService.existUserName(email) == true){
            return utilisateurService.connectName(email, password);
        }
        return "-0";
    }

    @GetMapping("/projects")
    public List<String> projects(@RequestParam String id){
        return utilisateurService.getUtilisateur(id).getListProjet();
    }

    @GetMapping("/add-projet")
    public ResponseEntity<String> addProjet(@RequestParam String userId, @RequestParam String projetId){
    Utilisateur user = utilisateurService.getUtilisateur(userId);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
    user.addProjet(projetId);
    utilisateurService.saveUtilisateur(user);  // save the updated user back to the database

    return ResponseEntity.ok("project add");
}
}
