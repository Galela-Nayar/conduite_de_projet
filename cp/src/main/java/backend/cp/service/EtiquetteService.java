package backend.cp.service;

import backend.cp.modele.Etiquette;
import backend.cp.repository.EtiquetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtiquetteService {

    @Autowired
    private EtiquetteRepository etiquetteRepository;

    public List<Etiquette> getAllEtiquettes() {
        return etiquetteRepository.findAll();
    }

    public Etiquette getEtiquette(String id)
    {
        for (Etiquette etiquette : getAllEtiquettes()) {
            if(etiquette.getId().equals(id)) return etiquette;
        }
        return null;
    }

    public String createEtiquette(String nom, String couleur) {
        Etiquette etiq = new Etiquette(nom, couleur);
        etiquetteRepository.save(etiq);
        return etiq.getId();
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
