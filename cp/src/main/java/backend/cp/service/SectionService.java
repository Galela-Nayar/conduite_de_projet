package backend.cp.service;

import backend.cp.modele.Section;
import backend.cp.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public void createSection(String name) {
        Section section = new Section();
        section.setName(name);
        sectionRepository.save(section);
    }

    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

}
