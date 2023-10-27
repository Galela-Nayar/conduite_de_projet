package backend.cp.controller;

import backend.cp.dto.UtilisateurDto;
import backend.cp.service.UtilisateurService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @Autowired
    public UtilisateurController(UtilisateurService sectionService) {
        this.utilisateurService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
        utilisateurService.createUtilisateur(utilisateurDto.getNom(), utilisateurDto.getPrenom(), utilisateurDto.getUserName(), utilisateurDto.getMail(), utilisateurDto.getPassword());
        return ResponseEntity.ok("Entité Utilisateur créée avec succès.");
    }

    @GetMapping("/login")
    public int loginUtilisateur(@RequestParam String email, @RequestParam String password){
        if(utilisateurService.existUser(email) == true){
            if(utilisateurService.connect(email, password)){
                return 1;
            }
            return 2;
        };
        return 0;
    }

}
