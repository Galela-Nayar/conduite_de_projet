package backend.cp.controller;

import backend.cp.modele.Section;
import backend.cp.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // replace with the domain your frontend is running on
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

}
