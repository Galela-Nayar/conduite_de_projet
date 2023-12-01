package backend.cp.service;

import backend.cp.modele.Projet;
import backend.cp.modele.Tache;
import backend.cp.modele.Utilisateur;
import backend.cp.repository.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TacheService {

    private final ApplicationContext context;
    private final TacheRepository tacheRepository;

    @Autowired
    public TacheService(TacheRepository tacheRepository, ApplicationContext context) {
        this.context = context;
        this.tacheRepository = tacheRepository;
    }

    public String createTache(String nom) {
        Tache tache = new Tache(nom);
        tacheRepository.save(tache);
        return tache.getId();
    }

    public String setDateLimite(String tacheId, Date dateLimite) {
        
        Tache t = this.getTache(tacheId);
        t.setDateLimite(dateLimite);
        tacheRepository.save(t);
        return "ok";
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

    public Utilisateur[] membreAttribue(String id) {
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        Tache tache = this.getTache(id);
        List<Utilisateur> usersList = new ArrayList<>();
        for (String user_id : tache.getMembreAttribue()) {
            Utilisateur user = utilisateurService.getUtilisateur(user_id);
            usersList.add(user);
        }
        Utilisateur[] usersArray = new Utilisateur[usersList.size()];
        usersArray = usersList.toArray(usersArray);
        return usersArray;
    }

    public void addCollaborateur(String id, String userId) {
        Tache tache = this.getTache(id);
        tache.getMembreAttribue().add(userId);
        tacheRepository.save(tache);
    }

    public Utilisateur[] membreRestant(String id, String projectId) {
        ProjetService projetService = context.getBean(ProjetService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        Projet pj = projetService.getProject(projectId);
        Tache tache = getTache(id);
        List<Utilisateur> usersList = new ArrayList<>();
        System.out.println("tache : \n\n\t- " + tache);
        System.out.println("tache.getMembreAttribue()  :\n\n\t" + tache.getMembreAttribue());
        for (String user_id : pj.getCollaborateurs()) {
            System.out.println("id à match :\n\t- " + user_id);
            boolean find = false;
            for (String user_id2 : tache.getMembreAttribue()) {

                System.out.println("\t\t- " + user_id2);
                if(user_id.equals(user_id2)){
                    find = true;
                }
            }
            if(!find){
                Utilisateur user = utilisateurService.getUtilisateur(user_id);
                usersList.add(user);
            }
        }
        Utilisateur[] usersArray = new Utilisateur[usersList.size()];
        usersArray = usersList.toArray(usersArray);
        return usersArray;
    }

    public void removeCollaborateur(String id, String userId) {
        Tache tache = this.getTache(id);
        tache.getMembreAttribue().remove(userId);
        tacheRepository.save(tache);
    }

    public void updatePriorite(String id, Integer priorite) {
        Tache sc = this.getTache(id);
        sc.setPriorite(priorite);
        this.tacheRepository.save(sc);
    }

    public void updatePonderation(String id, Integer ponderation) {
        Tache sc = this.getTache(id);
        sc.setPonderation(ponderation);
        this.tacheRepository.save(sc);
    }

    public void addEtiquette(String idTache, String idEtiquette)
    {
        Tache sc = this.getTache(idTache);
        if(!sc.getEtiquettes().contains(idEtiquette))
        {
            sc.getEtiquettes().add(idEtiquette);
            this.tacheRepository.save(sc);
        }
    }

    public void removeEtiquette(String idTache, String idEtiquette)
    {
        Tache sc = this.getTache(idTache);
        sc.getEtiquettes().remove(idEtiquette);
        this.tacheRepository.save(sc);
    }

    // Autres méthodes de service pour la gestion des tâches
}
