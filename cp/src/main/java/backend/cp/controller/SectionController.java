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

    @GetMapping("/create")
    public ResponseEntity<String> createSection(@RequestParam String name) {
        return ResponseEntity.ok(sectionService.createSection(name));
    }

    @GetMapping("/all")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

}
