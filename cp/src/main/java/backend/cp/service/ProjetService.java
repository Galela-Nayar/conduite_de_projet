package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Service
public class ProjetService {

    private final ProjetRepository projetRepository;

    @Autowired
    public ProjetService(ProjetRepository projetRepository) {
        this.projetRepository = projetRepository;
    }

    public void createProjet(String nom, String createur, String description, Date dateButtoire) {
        Projet projet = new Projet();
        projet.setNom(nom);
        projet.setCreateur(createur);
        projet.setDateCreation(new Date());
        projet.setDateButtoire(dateButtoire);
        projet.setDescription(description);
        projetRepository.save(projet);
    }

    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }

}
