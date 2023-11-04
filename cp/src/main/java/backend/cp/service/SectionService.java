package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.modele.Section;
import backend.cp.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public String createSection(String name) {
        Section section = new Section(name);
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

}
