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

    public String createProjet(String nom, String createur, Date date, boolean standardSection, String description, Date dateButtoire, String etat) {
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
        projet.setEtat(etat);
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


    public void updateSections(String projetId, List<String> sections) {
        Projet projet = projetRepository.findById(projetId).orElse(null);
        if (projet != null) {
            projet.setSections(sections);
            projetRepository.save(projet);
        }
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
        System.out.println("Enter in addSection");
        System.out.println("projectId" + projectId);
        Projet pj = getProject(projectId);
        System.out.println("project getted: " + pj);
        System.out.println("sectionId" + sectionId);
        pj.addSection(sectionId);
        System.out.println("project with section added");
        projetRepository.save(pj);
        System.out.println("project save");

    }

    public boolean removeSection(String id, String sectionId) {
        Projet pj = this.getProject(id);
        System.out.println("service projet : " + pj);
        boolean ok = pj.getSections().remove(sectionId);
        System.out.println("removed : " + ok);
        if(ok) this.projetRepository.save(pj);
        return ok;
    }
    
    public void updateEtat(String id, String newEtat)
    {
        System.out.println("Update de l'etat");
        Projet projet = this.getProject(id);
        if (projet != null) {
            projet.setEtat(newEtat);
            this.projetRepository.save(projet);
        }
    }

    public void setNom(String id, String param) {
        Projet projet = this.getProject(id);
        projet.setNom(param);
        projetRepository.save(projet);
    }

}
