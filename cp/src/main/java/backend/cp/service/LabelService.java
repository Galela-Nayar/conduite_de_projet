package backend.cp.service;

import backend.cp.modele.Label;
import backend.cp.repository.LabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public List<Label> getAllLabels() {
        return labelRepository.findAll();
    }

    public Optional<Label> getLabelById(String id) {
        return labelRepository.findById(id);
    }

    public Label createLabel(Label label) {
        return labelRepository.save(label);
    }

    public Label updateLabel(String id, Label updatedLabel) {
        if (labelRepository.existsById(id)) {
            updatedLabel.setId(id);
            return labelRepository.save(updatedLabel);
        } else {
            throw new IllegalArgumentException("Label with ID " + id + " does not exist.");
        }
    }

    public void deleteLabel(String id) {
        labelRepository.deleteById(id);
    }
}
