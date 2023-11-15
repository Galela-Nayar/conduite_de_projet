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
        Tache tache = tacheService.getTache(id);
        System.out.println("tache: " + tache);
        return tache;
    }

    @GetMapping("/removeTache")
    public ResponseEntity<String>removeTache(@RequestParam String id){
        System.out.println("ctr remove start");
        tacheService.removeTache(id);

        System.out.println("ctr remove end");
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/updateNom")
    public ResponseEntity<String> updateNom(@RequestParam String id, @RequestParam String nom){
        tacheService.updateNom(id, nom);
        return ResponseEntity.ok("");
    }

    @GetMapping("/swapStatut")
    public ResponseEntity<String> swapStatut(@RequestParam String id){
        tacheService.swapStatut(id);
        return ResponseEntity.ok("ok");
    }
}
