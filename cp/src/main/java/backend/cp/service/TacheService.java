package backend.cp.service;

import backend.cp.modele.Tache;
import backend.cp.repository.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TacheService {

    private final TacheRepository tacheRepository;

    @Autowired
    public TacheService(TacheRepository tacheRepository) {
        this.tacheRepository = tacheRepository;
    }

    public String createTache(String nom) {
        
        System.out.println("create tache");
        Tache tache = new Tache(nom);
        tacheRepository.save(tache);

        System.out.println(" tache saved");
        return tache.getId();
    }

    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }

    public Tache getTaches(String id) {
        if(tacheRepository.findById(id) != null) return tacheRepository.findById(id).get();
        List<Tache> taches = getAllTaches();
        for (Tache tache : taches) {
            if(tache.getId().equals(id)) return tache;
        }
        return null;
    }

    // Autres méthodes de service pour la gestion des tâches
}
