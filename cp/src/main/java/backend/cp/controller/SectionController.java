package backend.cp.controller;

import backend.cp.modele.Section;
import backend.cp.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sections")
public class SectionController {

    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping("/section")
    public Section getSection(@RequestParam String id){
        return sectionService.getSection(id);
    }

    @GetMapping("/create")
    public ResponseEntity<String> createSection(@RequestParam String name) {
        return ResponseEntity.ok(sectionService.createSection(name));
    }

    @GetMapping("/add-tache")
    public ResponseEntity<String> addTache(@RequestParam String sectionId, @RequestParam String tacheId) {
        System.out.println("Enter in add-tache");
        if(tacheId.isBlank()) System.out.println("tacheId is blank: " + tacheId);
        if(sectionId.isBlank()) System.out.println("sectionId is blank" + sectionId);

        sectionService.addTache(sectionId,tacheId);
        System.out.println("tache added");
        return ResponseEntity.ok("tache ajouté");
    }

    @GetMapping("/all")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }


    //Renvoi le nom de la section à partir de l'id (of course)
    @GetMapping("/getNom")
    public String getNom(@RequestParam String sectionId)
    {
        return sectionService.getNom(sectionId);
    }

    @GetMapping("/removeSection")
    public ResponseEntity<String>removeSection(@RequestParam String id){
        System.out.println("ctr remove start");
        sectionService.removeSection(id);

        System.out.println("ctr remove end");
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/removeTache")
    public ResponseEntity<String> removeTache(@RequestParam String id, @RequestParam String tacheId){
        System.out.println("ctr remove start section id : " + id + "   |  tacheID : " + tacheId);
        if(sectionService.removeTache(id, tacheId)) return ResponseEntity.ok("ok");
        System.out.println("ctr remove end");
        return ResponseEntity.ok("probleme");
    }

    @PutMapping("/updateNom")
    public ResponseEntity<String> updateNom(@RequestParam String id, @RequestParam String nom){
        sectionService.updateNom(id, nom);
        return ResponseEntity.ok("");
    }

    @PutMapping("/updateTaches")
    public ResponseEntity<String> updateTaches(@RequestParam String id, @RequestParam ArrayList<String> taches){
        sectionService.updateTaches(id, taches);
        return ResponseEntity.ok("");
    }
    

}
