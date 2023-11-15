package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.modele.Section;
import backend.cp.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }


    public void updateTaches(String tacheId, List<String> taches) {
        Section section = sectionRepository.findById(tacheId).orElse(null);
        if (section != null) {
            section.setTaches(taches);
            sectionRepository.save(section);
        }
    }
    public String createSection(String name, Boolean estEtat) {
        Section section = new Section(name, estEtat);
        sectionRepository.save(section);
        return section.getId();
    }

    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    public Section getSection(String sectionId) {
        List<Section> sections = getAllSections();
        for (Section section : sections) {
            if(section.getId().equals(sectionId)) return section;
        }
        return null;
    }

    public void addTache(String sectionId, String tacheId) {
        System.out.println("Enter in addTache");
        System.out.println("sectionId" + sectionId);
        Section section = getSection(sectionId);
        System.out.println("section getted: " + section);
        System.out.println("tacheId" + tacheId);
        section.addTache(tacheId);
        System.out.println("project with section added");
        sectionRepository.save(section);
        System.out.println("section save");

    }

    public void removeSection(String id) {
        Section section = this.getSection(id);
        System.out.println("service section : " + section);
        this.sectionRepository.delete(section);
    }

    public boolean removeTache(String id, String tacheId) {
        Section sc = this.getSection(id);
        System.out.println("service section : " + sc);
        boolean ok = sc.getTaches().remove(tacheId);
        System.out.println("removed : " + ok);
        if(ok) this.sectionRepository.save(sc);
        return ok;
    }

    public void updateNom(String id, String nom){
        Section sc = this.getSection(id);
        sc.setNom(nom);
        this.sectionRepository.save(sc);
    }

    public void updateEstEtat(String id, Boolean estEtat){
        Section sc = this.getSection(id);
        sc.setEstEtat(estEtat);
        this.sectionRepository.save(sc);
    }

    public String getNom(String id)
    {
        Section sc = this.getSection(id);
        return sc.getNom();
    }
}
