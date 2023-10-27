package backend.cp.controller;

import backend.cp.modele.Section;
import backend.cp.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sections")
public class SectionController {

    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createSection(@RequestParam String name) {
        sectionService.createSection(name);
        return ResponseEntity.ok("section creer");
    }

    @GetMapping("/all")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

}
