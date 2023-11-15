package backend.cp.controller;

import backend.cp.dto.ProjetDto;
import backend.cp.modele.Projet;
import backend.cp.modele.Section;
import backend.cp.service.ProjetService;

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
        System.out.println("Enter in create-section");
        if(projectId.isBlank()) System.out.println("projectId is blank: " + projectId);
        if(sectionId.isBlank()) System.out.println("sectionId is blank" + sectionId);

        projetService.addSection(projectId,sectionId);
        System.out.println("section added");
        return ResponseEntity.ok("section ajouté");
    }

    @GetMapping("/projet")
    public Projet projet(@RequestParam String id) {
            
        return projetService.getProject(id);
    }

    //Renvoi la liste des sections d'un projet, qui sont des etats (Juste l'id)
    @GetMapping("/getEtatId")
    public List<String> getEtat(@RequestParam String id)
    {
        return projetService.getEtatId(id);
    }

    //Renvoi la liste des sections d'un projet, qui sont PAS des etats
    @GetMapping("/getSectionNotEtat")
    public List<Section> getSectionNotEtat(@RequestParam String id)
    {
        return projetService.getSectionNotEtat(id);
    }

    @GetMapping("/removeSection")
    public ResponseEntity<String> removeSection(@RequestParam String id, @RequestParam String sectionId){
        System.out.println("ctr remove start");
        if(projetService.removeSection(id, sectionId)) return ResponseEntity.ok("ok");
        System.out.println("ctr remove end");
        return ResponseEntity.ok("pas ok, section non retiré du projet");
    }

    //Ca mets à jour la valeur de "modeAffichage" dans la base de données
    @GetMapping("/updateModeAffichage")
    public ResponseEntity<String> updateModeAffichage(@RequestParam String id, @RequestParam String newModeAffichage)
    {
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("projet not found");
        projetService.updateModeAffichage(id, newModeAffichage);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_nom")
    public ResponseEntity<String> setNom(@RequestParam String id, @RequestParam String param){
        if(projetService.getProject(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        projetService.setNom(id, param);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/updateSections")
    public ResponseEntity<String> updateSections(@RequestParam String id, @RequestParam ArrayList<String> sections){
        System.out.println("hooooooooooooo  " + sections);
        projetService.updateSections(id, sections);
        return ResponseEntity.ok("");
    }

}
