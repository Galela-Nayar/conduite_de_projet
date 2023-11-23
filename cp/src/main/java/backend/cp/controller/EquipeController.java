package backend.cp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.cp.modele.Equipe;
import backend.cp.repository.EquipeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // replace with the domain your frontend is running on
@RequestMapping("/equipe")
public class EquipeController {

    @Autowired
    private EquipeRepository equipeRepository;

    @GetMapping
    public List<Equipe> getAllEquipes() {
        return equipeRepository.findAll();
    }

    @PostMapping
    public Equipe createEquipe(@RequestBody Equipe equipe) {
        return equipeRepository.save(equipe);
    }
    
    @PutMapping("/{id}/addCollaborateur")
    public Equipe addCollaborateur(@PathVariable String id, @RequestParam String collaborateurEmail) {
        Equipe equipe = equipeRepository.findById(id).orElse(null);
        if (equipe != null && !equipe.getCollaborateurs().contains(collaborateurEmail)) {
            equipe.getCollaborateurs().add(collaborateurEmail);
            return equipeRepository.save(equipe);
        }
        return null; // Gérez le cas où l'équipe n'est pas trouvée ou le collaborateur est déjà ajouté
    }

    @PutMapping("/{id}/removeCollaborateur")
    public Equipe removeCollaborateur(@PathVariable String id, @RequestParam String collaborateurEmail) {
        Equipe equipe = equipeRepository.findById(id).orElse(null);
        if (equipe != null && equipe.getCollaborateurs().contains(collaborateurEmail)) {
            equipe.getCollaborateurs().remove(collaborateurEmail);
            return equipeRepository.save(equipe);
        }
        return null; // Gérez le cas où l'équipe n'est pas trouvée ou le collaborateur n'est pas présent
    }
    
   
}
