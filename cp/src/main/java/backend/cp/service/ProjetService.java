package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.modele.Section;
import backend.cp.modele.Utilisateur;
import backend.cp.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjetService {

    @Autowired
    private final ProjetRepository projetRepository;

    @Autowired
    private final SectionService sectionService;

    @Autowired
    private final UtilisateurService utilisateurService;

    @Autowired
    public ProjetService(ProjetRepository projetRepository, SectionService sectionService, UtilisateurService utilisateurService) {
        this.projetRepository = projetRepository;
        this.sectionService = sectionService;
        this.utilisateurService = utilisateurService;
    }

    public String createProjet(String nom, String createur, Date date, boolean standardSection, String description, Date dateButtoire, String modeAffichage) {
        Projet projet = new Projet();
        projet.setNom(nom);
        projet.setCreateur(createur);
        if(standardSection) projet.setSections(setSection());
        projet.setDateCreation(date);
        List<String> collab = new ArrayList<>();
        collab.add(createur);
        Map<Integer, String> droitUtilisateur = new HashMap<>();
        droitUtilisateur.put(0, "Admin");
        projet.setDroitUtilisateur(droitUtilisateur);
        projet.setCollaborateurs(collab);
        projet.setDateButtoire(dateButtoire);
        projet.setDescription(description);
        projet.setModeAffichage(modeAffichage);
        projetRepository.save(projet);
        return projet.getId();
    }

    private List<String> setSection() {
        ArrayList<String> sections = new ArrayList<>();
        sections.add(sectionService.createSection("a faire", false));
        sections.add(sectionService.createSection("en cours", false));
        sections.add(sectionService.createSection("terminé", false));
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

    public List<String> getEtatId(String id)
    {
        Projet pj = this.getProject(id);
        List<String> sections = pj.getSections();
        List<String> etats = new ArrayList<>();
        for (String section : sections) {
            if(sectionService.getSection(section).getEstEtat())
            {
                etats.add(section);
            }
        }
        return etats;
    }

    public List<Section> getSectionNotEtat(String id)
    {
        Projet pj = this.getProject(id);
        List<String> sections = pj.getSections();
        List<Section> sectionsPasEtat = new ArrayList<>();
        for (String section : sections) {
            if(!sectionService.getSection(section).getEstEtat())
            {
                sectionsPasEtat.add(sectionService.getSection(section));
            }
        }
        return sectionsPasEtat;
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
    
    public void updateModeAffichage(String id, String newModeAffichage)
    {
        Projet projet = this.getProject(id);
        if (projet != null) {
            projet.setModeAffichage(newModeAffichage);
            this.projetRepository.save(projet);
        }
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

    public Utilisateur[] collaborateurs(String id) {
        System.out.println("collaborateurs service : " + "start");
        Projet projet = this.getProject(id);
        List<Utilisateur> usersList = new ArrayList<>();
        for (String user_id : projet.getCollaborateurs()) {
            Utilisateur user = utilisateurService.getUtilisateur(user_id);
            usersList.add(user);
        }
        Utilisateur[] usersArray = new Utilisateur[usersList.size()];
        usersArray = usersList.toArray(usersArray);
        return usersArray;
    }

    public boolean add_collaborateur(String id, String nom, String droit) {
        if(utilisateurService.existUser(nom) | utilisateurService.existUserName(nom)){
            System.out.println("utilisateur exist");
            Projet pj = this.getProject(id);
            String userId = utilisateurService.getUtilisateurByName(nom).getId();
            if(!pj.getCollaborateurs().contains(userId))
            {
                pj.addCollaborateur(userId, droit);
                utilisateurService.addProjet(userId,id);
                this.projetRepository.save(pj);
                return true;
            }

        } 
        return false;
    }

    public void removeCollaborateur(String id, String userId) {
        Projet pj = this.getProject(id);
        pj.removeCollaborateur(userId);
        projetRepository.save(pj);
    }

    public String droitUtilisateur(String idUtilisateur, String idProjet)
    {
        
        Projet projet = this.getProject(idProjet);
        if(projet != null)
        {
            int index = projet.getCollaborateurs().indexOf(idUtilisateur);
            return projet.getDroitUtilisateur().get(index);
        }

        return null;
    }

    public void changerDroits(String id, String droit, int index)
    {
        Projet projet = this.getProject(id);
        if (projet != null) {
            Map<Integer, String> nouveauxDroits = new HashMap<>();
            nouveauxDroits = projet.getDroitUtilisateur();
            nouveauxDroits.replace(index, droit);
            projet.setDroitUtilisateur(nouveauxDroits);
            this.projetRepository.save(projet);
        }
    }
}
