package backend.cp.controller;

import backend.cp.modele.Projet;
import backend.cp.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projets")
public class ProjetController {

    private final ProjetService projetService;

    @Autowired
    public ProjetController(ProjetService projetService) {
        this.projetService = projetService;
    }

    @PostMapping("/create")
    public Projet createProjet(@RequestBody Projet projet) {
        return projetService.createProjet(projet);
    }

    @GetMapping("/all")
    public List<Projet> getAllProjets() {
        return projetService.getAllProjets();
    }

    // Autres endpoints du contrôleur pour la gestion des projets
}
