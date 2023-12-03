package backend.cp.controller;

import backend.cp.modele.Commentaire;
import backend.cp.modele.Tache;
import backend.cp.modele.Utilisateur;
import backend.cp.service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/taches")
public class TacheController {

    private final TacheService tacheService;

    @Autowired
    public TacheController(TacheService tacheService) {
        this.tacheService = tacheService;
    }

    @GetMapping("/create")
    public String createTache(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String name) {
        String reponse = tacheService.createTache(id, projectId, sectionId, name);
        return reponse;
    }

        @GetMapping("/commentaires")
    public Commentaire[] commentaires(@RequestParam String id){
        return tacheService.commentaires(id);
    }

    @GetMapping("/setDateLimite")
    public String setDateLimite(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId,@RequestParam String tacheId, @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") Date dateLimite) {
        String reponse = tacheService.setDateLimite(id, projectId, sectionId, tacheId, dateLimite);
        return reponse;
    }

    @GetMapping("/all")
    public List<Tache> getAllTaches() {
        return tacheService.getAllTaches();
    }

    @GetMapping("/tache")
    public Tache getTaches(@RequestParam String id) {
        Tache tache = tacheService.getTache(id);
        return tache;
    }


    @GetMapping("/removeTache")
    public ResponseEntity<String>removeTache(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId,@RequestParam String tacheId){
        tacheService.removeTache(id, projectId, sectionId, tacheId);

        return ResponseEntity.ok("ok");
    }

    @PutMapping("/updateNom")
    public ResponseEntity<String> updateNom(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String tacheId, @RequestParam String nom){
        tacheService.updateNom(id, projectId, sectionId, tacheId, nom);
        return ResponseEntity.ok("");
    }

    @PutMapping("/updatePriorite")
    public ResponseEntity<String> updatePriorite(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String tacheId, @RequestParam Integer priorite){
        tacheService.updatePriorite(id, projectId, sectionId, tacheId, priorite);
        return ResponseEntity.ok("");
    }

    @PutMapping("/updatePonderation")
    public ResponseEntity<String> updatePonderation(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String tacheId, @RequestParam Integer ponderation){
        tacheService.updatePonderation(id, projectId, sectionId, tacheId, ponderation);
        return ResponseEntity.ok("");
    }

    @GetMapping("/swapStatut")
    public ResponseEntity<String> swapStatut(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String tacheId){
        tacheService.swapStatut(id, projectId, sectionId, tacheId);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/membreAttribue")
    public Utilisateur[] membreAttribue(@RequestParam String id){
        return tacheService.membreAttribue(id);
    }

    @GetMapping("/add_collaborateur")
    public ResponseEntity<String> addCollaborateur(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String tacheId, @RequestParam String collaborateurId){
        tacheService.addCollaborateur(id, projectId, sectionId, tacheId, collaborateurId);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/remove_collaborateur")
    public ResponseEntity<String> removeCollaborateur(@RequestParam String id, @RequestParam String projectId, @RequestParam String sectionId, @RequestParam String tacheId, @RequestParam String collaborateurId){
        tacheService.removeCollaborateur(id, projectId, sectionId, tacheId, collaborateurId);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/membreRestant")
    public Utilisateur[] membreRestant(@RequestParam String id, @RequestParam String projectId){
        System.out.println("membreRestant start");
        Utilisateur[] ut = tacheService.membreRestant(id, projectId);
        System.out.println("membreRestant start, return : " + ut);
        return ut;
    }

    @GetMapping("/add_etiquette")
    public ResponseEntity<String> addEtiquette(@RequestParam String idTache, @RequestParam String idEtiquette){
        tacheService.addEtiquette(idTache, idEtiquette);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/remove_etiquette")
    public ResponseEntity<String> removeEtiquette(@RequestParam String idTache, @RequestParam String idEtiquette){
        tacheService.removeEtiquette(idTache, idEtiquette);
        return ResponseEntity.ok("ok");
    }


}
