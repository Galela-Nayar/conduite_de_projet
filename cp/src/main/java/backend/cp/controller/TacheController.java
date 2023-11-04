package backend.cp.controller;

import backend.cp.modele.Tache;
import backend.cp.service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public String createTache(@RequestParam String name) {
        System.out.println("create tache");
        String reponse = tacheService.createTache(name);
        
        System.out.println(reponse);
        return reponse;
    }

    @GetMapping("/all")
    public List<Tache> getAllTaches() {
        return tacheService.getAllTaches();
    }

    @GetMapping("/tache")
    public Tache getTaches(@RequestParam String id) {
        Tache tache = tacheService.getTaches(id);
        System.out.println("tache: " + tache);
        return tache;
    }
}
