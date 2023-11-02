package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.modele.Section;
import backend.cp.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjetService {

    private final ProjetRepository projetRepository;

    @Autowired
    public ProjetService(ProjetRepository projetRepository) {
        this.projetRepository = projetRepository;
    }

    public String createProjet(String nom, String createur, Date date, boolean standardSection, String description, Date dateButtoire) {
        Projet projet = new Projet();
        projet.setId(UUID.randomUUID().toString());
        projet.setNom(nom);
        projet.setCreateur(createur);
        if(standardSection) projet.setSections(setSection());
        else projet.setSections(null);
        projet.setDateCreation(date);
        List<String> collab = new ArrayList<>();
        collab.add(createur);
        projet.setCollaborateurs(collab);
        projet.setDateButtoire(dateButtoire);
        projet.setDescription(description);
        projetRepository.save(projet);
        return projet.getId();
    }

    private List<Section> setSection() {
        return null;
    }

    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }

    public Projet getProjetById(String projetId) {
        Optional<Projet> projetOptional = projetRepository.findById(projetId);
        if (projetOptional.isPresent()) {
            return projetOptional.get();
        }
        else{
            return null;
        }
    }

}
