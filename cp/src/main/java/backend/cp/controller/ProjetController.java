package backend.cp.controller;

import backend.cp.dto.ProjetDto;
import backend.cp.modele.Projet;
import backend.cp.service.ProjetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


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
            String id =projetService.createProjet(projet.getNom(), projet.getCreateur(), projet.getDate(), projet.isStandardSection(), projet.getDescription(), projet.getDateButoire());
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

    @GetMapping("/removeSection")
    public ResponseEntity<String> removeSection(@RequestParam String id, @RequestParam String sectionId){
        System.out.println("ctr remove start");
        if(projetService.removeSection(id, sectionId)) return ResponseEntity.ok("ok");
        System.out.println("ctr remove end");
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
        System.out.println("delete : " + "start");
        projetService.deleteProject(id);
        System.out.println("delete : " + "end");
        return ResponseEntity.ok("ok");
    }
}
