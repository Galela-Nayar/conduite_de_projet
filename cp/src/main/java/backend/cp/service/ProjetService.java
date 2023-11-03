package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProjetService {

    private final ProjetRepository projetRepository;
    private final SectionService sectionService;

    @Autowired
    public ProjetService(ProjetRepository projetRepository, SectionService sectionService) {
        this.projetRepository = projetRepository;
        this.sectionService = sectionService;
    }

    public String createProjet(String nom, String createur, Date date, boolean standardSection, String description, Date dateButtoire) {
        Projet projet = new Projet();
        projet.setNom(nom);
        projet.setCreateur(createur);
        if(standardSection) projet.setSections(setSection());
        projet.setDateCreation(date);
        List<String> collab = new ArrayList<>();
        collab.add(createur);
        projet.setCollaborateurs(collab);
        projet.setDateButtoire(dateButtoire);
        projet.setDescription(description);
        projetRepository.save(projet);
        return projet.getId();
    }

    private List<String> setSection() {
        ArrayList<String> sections = new ArrayList<>();
        sections.add(sectionService.createSection("a faire"));
        sections.add(sectionService.createSection("en cours"));
        sections.add(sectionService.createSection("terminé"));
        return sections;
    }

    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }

    public Projet getProject(String id) {
        for (Projet project : getAllProjets()) {
            if(project.getId().equals(id)) return project;
        }
        return null;
    }

    public void addSection(String projectId, String sectionId) {
        Projet pj = getProject(projectId);
        pj.addSection(sectionId);
        projetRepository.save(pj);

    }

}
