package backend.cp.controller;

import backend.cp.modele.Section;
import backend.cp.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Section createSection(@RequestBody Section section) {
        return sectionService.createSection(section);
    }

    @GetMapping("/all")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    // Autres endpoints du contrôleur pour la gestion des sections
}
