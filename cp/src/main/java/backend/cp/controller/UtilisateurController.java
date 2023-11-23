package backend.cp.controller;

import backend.cp.dto.UtilisateurDto;
import backend.cp.modele.Utilisateur;
import backend.cp.service.UtilisateurService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.RequestEntity.HeadersBuilder;
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

    @GetMapping("/user")
    public Utilisateur user(@RequestParam String id){
        return utilisateurService.getUtilisateur(id);
    }


    @GetMapping("/set_userName")
    public ResponseEntity<String> setNomUtilisateur(@RequestParam String id, @RequestParam String param){

        System.out.println("ok");
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setUserName(id,param);
        System.out.println("ok");
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_nom")
    public ResponseEntity<String> setNom(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setNom(id, param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_prenom")
    public ResponseEntity<String> setPrenom(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setPrenom(id,param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_email")
    public ResponseEntity<String> setEmail(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setEmail(id, param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_bio")
    public ResponseEntity<String> setBio(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setBio(id, param);
        return ResponseEntity.ok("ok");
    }
   

    
}
