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
        Tache tache = new Tache(nom);
        tacheRepository.save(tache);
        return tache.getId();
    }

    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }

    public Tache getTache(String id) {
        if(tacheRepository.findById(id) != null) return tacheRepository.findById(id).get();
        List<Tache> taches = getAllTaches();
        for (Tache tache : taches) {
            if(tache.getId().equals(id)) return tache;
        }
        return null;
    }

    public void removeTache(String id) {
        Tache tache = this.getTache(id);
        System.out.println("service tache : " + tache);
        this.tacheRepository.delete(tache);
    }

    public void updateNom(String id, String nom){
        Tache sc = this.getTache(id);
        sc.setNom(nom);
        this.tacheRepository.save(sc);
    }

    public void swapStatut(String id) {
        Tache user = this.getTache(id);
        user.swapStatut();
        this.tacheRepository.save(user);
    }

    // Autres méthodes de service pour la gestion des tâches
}
