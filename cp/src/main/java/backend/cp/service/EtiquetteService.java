package backend.cp.service;

import backend.cp.modele.Etiquette;
import backend.cp.repository.EtiquetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtiquetteService {

    @Autowired
    private EtiquetteRepository etiquetteRepository;

    public List<Etiquette> getAllEtiquettes() {
        return etiquetteRepository.findAll();
    }

    public Optional<Etiquette> getEtiquetteById(String id) {
        return etiquetteRepository.findById(id);
    }

    public Etiquette createEtiquette(Etiquette etiquette) {
        return etiquetteRepository.save(etiquette);
    }

    public Etiquette updateEtiquette(String id, Etiquette updatedEtiquette) {
        if (etiquetteRepository.existsById(id)) {
            updatedEtiquette.setId(id);
            return etiquetteRepository.save(updatedEtiquette);
        } else {
            throw new IllegalArgumentException("Etiquette with ID " + id + " does not exist.");
        }
    }

    public void deleteEtiquette(String id) {
        etiquetteRepository.deleteById(id);
    }
}
