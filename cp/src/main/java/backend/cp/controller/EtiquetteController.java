package backend.cp.controller;

import backend.cp.modele.Etiquette;
import backend.cp.service.EtiquetteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/etiquettes")
public class EtiquetteController {

    @Autowired
    private EtiquetteService etiquetteService;

    @GetMapping
    public List<Etiquette> getAllEtiquettes() {
        return etiquetteService.getAllEtiquettes();
    }

    @GetMapping("/getById")
    public ResponseEntity<Etiquette> getEtiquetteById(@RequestParam String id) {
        return ResponseEntity.ok(etiquetteService.getEtiquette(id));
    }

    @GetMapping("/create")
    public ResponseEntity<String> createEtiquette(@RequestParam String nom, @RequestParam String couleur) {
        String couleurCor = "#" + couleur;
        System.out.println("couleur : " + couleurCor);
        return ResponseEntity.ok(etiquetteService.createEtiquette(nom, couleurCor));
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deleteEtiquette(@RequestParam String id)
    {
        etiquetteService.deleteEtiquette(id);
        return ResponseEntity.ok("ok");
    }
}
