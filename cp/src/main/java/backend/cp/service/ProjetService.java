package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProjetService {

    private final ProjetRepository projetRepository;
    private final SectionService sectionService;
    private final UtilisateurService utilisateurService;

    @Autowired
    public ProjetService(ProjetRepository projetRepository, SectionService sectionService, UtilisateurService utilisateurService) {
        this.projetRepository = projetRepository;
        this.sectionService = sectionService;
        this.utilisateurService = utilisateurService;
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

    public void setNom(String id, String param) {
        Projet projet = this.getProject(id);
        projet.setNom(param);
        projetRepository.save(projet);
    }

    public void setDate(String id, String day, String month, String year) {
        Projet projet = this.getProject(id);
        projet.setDateButtoire(Timestamp.valueOf(LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day)).atStartOfDay()));
        projetRepository.save(projet);
    }

    public void setDescription(String id, String description) {

        Projet projet = this.getProject(id);
        projet.setDescription(description);
        projetRepository.save(projet);
    }

    public void deleteProject(String id) {
        System.out.println("delete service : " + "start");
        Projet projet = this.getProject(id);
        for (String section_id : projet.getSections()) {
            sectionService.removeSection(section_id);
        }
        for (String user_id : projet.getCollaborateurs()) {
            utilisateurService.removeProject(user_id, id);
        }
        projetRepository.delete(projet);
        System.out.println("delete service : " + "start");
    }

}
