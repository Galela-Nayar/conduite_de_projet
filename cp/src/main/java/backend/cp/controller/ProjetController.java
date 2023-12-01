package backend.cp.controller;

import backend.cp.dto.ProjetDto;
import backend.cp.modele.Projet;
import backend.cp.modele.Section;
import backend.cp.modele.Utilisateur;
import backend.cp.service.ProjetService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200") // replace with the domain your frontend is running on
@RestController
@RequestMapping("/projets")
public class ProjetController {


    @Autowired
    private ProjetService projetService;

    public ProjetController(ProjetService projetService) {
        this.projetService = projetService;
    }
/* ajouter un test pour voir si aucun autre projet dont le créateur est l'utilisateur avec le même nom  */
    @PostMapping("/create")
    public ResponseEntity<String> createProjet(
        @RequestBody ProjetDto projet) {
            String id =projetService.createProjet(projet.getNom(), projet.getCreateur(), projet.getDate(), projet.isStandardSection(), projet.getDescription(), projet.getDateButoire(), projet.getModeAffichage());
        return ResponseEntity.ok(id);
    }
    
    @GetMapping("/create-section")
    public ResponseEntity<String> addsection(@RequestParam String projectId, @RequestParam String sectionId) {

        projetService.addSection(projectId,sectionId);
        return ResponseEntity.ok("section ajouté");
    }

    @GetMapping("/projet")
    public Projet projet(@RequestParam String id) {
            
        return projetService.getProject(id);
    }

    @GetMapping("/removeSection")
    public ResponseEntity<String> removeSection(@RequestParam String id, @RequestParam String sectionId){
        if(projetService.removeSection(id, sectionId)) return ResponseEntity.ok("ok");
        return ResponseEntity.ok("pas ok, section non retiré du projet");
    }

    @GetMapping("/set_nom")
    public ResponseEntity<String> setNom(@RequestParam String id, @RequestParam String param){
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        projetService.setNom(id, param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_date")
    public ResponseEntity<String> setDate(@RequestParam String id, @RequestParam String day, @RequestParam String month, @RequestParam String year){
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        projetService.setDate(id, day, month, year);
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/set_description")
    public ResponseEntity<String> setDescription(@RequestParam String id, @RequestBody String description) {
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        projetService.setDescription(id,description);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/updateSections")
    public ResponseEntity<String> updateSections(@RequestParam String id, @RequestParam ArrayList<String> sections){
        projetService.updateSections(id, sections);
        return ResponseEntity.ok("");
    }

    @GetMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String id){
        projetService.deleteProject(id);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/collaborateurs")
    public Utilisateur[] collaborateurs(@RequestParam String id){
        return projetService.collaborateurs(id);
    }

    @GetMapping("/add_collaborateur")
    public ResponseEntity<String> addCollaborateur(@RequestParam String id, @RequestParam String nom, @RequestParam String droit){
        if(projetService.add_collaborateur(id, nom, droit))  return ResponseEntity.ok("ok");
        else return ResponseEntity.ok("error");
    }

    @GetMapping("/remove_collaborateur")
    public ResponseEntity<String> removeCollaborateur(@RequestParam String id, @RequestParam String userId){
        projetService.removeCollaborateur(id, userId);
        return ResponseEntity.ok("ok");
    }

    //Ca mets à jour la valeur de "modeAffichage" dans la base de données
    @GetMapping("/updateModeAffichage")
    public ResponseEntity<String> updateModeAffichage(@RequestParam String id, @RequestParam String newModeAffichage)
    {
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("projet not found");
        projetService.updateModeAffichage(id, newModeAffichage);
        return ResponseEntity.ok("ok");
    }

    //Renvoie les droits de l'utilisateur id sur le projet
    @GetMapping("/droitUtilisateur")
    public ResponseEntity<String> droitUtilisateur(@RequestParam String idUtilisateur, @RequestParam String idProjet){
        return ResponseEntity.ok(projetService.droitUtilisateur(idUtilisateur, idProjet));
    }

    @GetMapping("/changerDroits")
    public ResponseEntity<String> changerDroit(@RequestParam String id, @RequestParam String droit, @RequestParam int index)
    {
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("projet not found");
        projetService.changerDroits(id, droit, index);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/addEtiquette")
    public ResponseEntity<String> addEtiquette(@RequestParam String idProjet, @RequestParam String idEtiquette)
    {
        if(projetService.getProject(idProjet) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("projet not found");
        projetService.addEtiquette(idProjet, idEtiquette);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/removeEtiquette")
    public ResponseEntity<String> removeEtiquette(@RequestParam String idProjet, @RequestParam String idEtiquette)
    {
        if(projetService.getProject(idProjet) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("projet not found");
        projetService.removeEtiquette(idProjet, idEtiquette);
        return ResponseEntity.ok("ok");
    }
}
