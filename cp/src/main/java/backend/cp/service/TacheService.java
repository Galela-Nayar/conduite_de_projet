package backend.cp.service;

import backend.cp.modele.Commentaire;
import backend.cp.modele.Notification;
import backend.cp.modele.Projet;
import backend.cp.modele.Tache;
import backend.cp.modele.Utilisateur;
import backend.cp.repository.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
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

    public String createTache(String id, String projectId, String sectionId, String nom) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());
        Tache tache = new Tache(nom);
        
        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à créer la tâche le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);

        tache.addCommentaire(comentaire.getId());

        tacheRepository.save(tache);

        Notification notification = new Notification(id,projectId,sectionId,
        utilisateurService.getUtilisateur(id).getUserName() +
         " à créer la tâche " +
        nom +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        "."
        , new Date());
        notificationService.sendNotification(notification);
        

        return tache.getId();
    }

    public String setDateLimite(String id, String projectId, String sectionId, String tacheId, Date dateLimite) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache t = this.getTache(tacheId);
        t.setDateLimite(dateLimite);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(t.getDateLimite());
        String date = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à modifié la date limite de la tâche au " +
        formattedDate + 
        ", le " +
        date +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , t.getId());

        commentaireService.save(comentaire);

        t.addCommentaire(comentaire.getId());

        tacheRepository.save(t);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
         " à modifié la date limite de la tâche " +
        t.getNom() +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        " à " +
        formattedDate +
        "."
        , new Date());
        notificationService.sendNotification(notification);
        
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

    public void removeTache(String id, String projectId, String sectionId, String tacheId) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        this.tacheRepository.delete(tache);
        Notification notification = new Notification(id,projectId,sectionId,
        utilisateurService.getUtilisateur(id).getUserName() +
         " à supprimé la tâche " +
        tache.getNom() +
        " de la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        "."
        , new Date());
        notificationService.sendNotification(notification);
    }

    public void updateNom(String id, String projectId, String sectionId, String tacheId, String nom){
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        String nomPrecedant = tache.getNom();
        tache.setNom(nom);

        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à modifé le nom de la tache de " + nomPrecedant + " à " +
        tache.getNom() +
        ", le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);
        tache.addCommentaire(comentaire.getId());

        this.tacheRepository.save(tache);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
         " à modifié le nom de la tâche " +
        nomPrecedant +
        " par " +
        tache.getNom() +
        " de la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        "."
        , new Date());
        notificationService.sendNotification(notification);
    }

    public void swapStatut(String id, String projectId, String sectionId, String tacheId) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        tache.swapStatut();

        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à passé le statut à " +
        tache.isStatutTerminer() + 
        ", le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);

        tache.addCommentaire(comentaire.getId());

        this.tacheRepository.save(tache);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
         " à passé le statut de la tâche " +
        tache.getNom() +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        " à " +
        (tache.isStatutTerminer() ? "Terminé" : "En cours" )+
        "."
        , new Date());
        notificationService.sendNotification(notification);
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

    public void addCollaborateur(String id, String projectId, String sectionId, String tacheId, String collaborateurId) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        tache.getMembreAttribue().add(collaborateurId);

        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à ajouté à la tache " + 
        utilisateurService.getUtilisateur(collaborateurId).getUserName() +
        ", le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);
        tache.addCommentaire(comentaire.getId());

        tacheRepository.save(tache);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
        (id == collaborateurId ? 
            " c'est assigné sur la tache " 
        : 
            " à assigné " + 
            utilisateurService.getUtilisateur(collaborateurId).getUserName() +
            " à la tâche " 
        )+
        tache.getNom() +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        "."
        , new Date());
        notificationService.sendNotification(notification);
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

    public void removeCollaborateur(String id, String projectId, String sectionId, String tacheId, String collaborateurId) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        tache.getMembreAttribue().remove(collaborateurId);

        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à retiré de la tache " + 
        utilisateurService.getUtilisateur(collaborateurId).getUserName() +
        ", le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);
        tache.addCommentaire(comentaire.getId());
        
        tacheRepository.save(tache);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
        (id == collaborateurId ? 
            " c'est retiré de la tache " 
        : 
            " à retiré " + 
            utilisateurService.getUtilisateur(collaborateurId).getUserName() +
            " de la tâche " 
        )+
        tache.getNom() +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        "."
        , new Date());
        notificationService.sendNotification(notification);
    }

    public void updatePriorite(String id, String projectId, String sectionId, String tacheId, Integer priorite) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        Integer prioritePrecedente = tache.getPriorite();
        tache.setPriorite(priorite);

        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à changé la priorité de " + prioritePrecedente + " à " + 
        tache.getPonderation() +
        ", le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);
        tache.addCommentaire(comentaire.getId());
        
        this.tacheRepository.save(tache);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
        " à changé la priorité de la tâche " +
        tache.getNom() +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        " de " +
        prioritePrecedente +
        " à " +
        priorite +
        "."
        , new Date());
        notificationService.sendNotification(notification);
    }

    public void updatePonderation(String id, String projectId, String sectionId, String tacheId, Integer ponderation) {
        NotificationService notificationService = context.getBean(NotificationService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        Tache tache = this.getTache(tacheId);
        Integer ponderationPrecedente = tache.getPonderation();
        tache.setPonderation(ponderation);

        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(new Date());

        Commentaire comentaire = new Commentaire(id, new Date(), 
        utilisateurService.getUtilisateur(id).getUserName() +
         " à changé la pondération de " + ponderationPrecedente + " à " + 
        tache.getPonderation() +
        ", le " +
        formattedDate +
         " à " +
        LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + "."
        , tache.getId());

        commentaireService.save(comentaire);
        tache.addCommentaire(comentaire.getId());

        this.tacheRepository.save(tache);
        Notification notification = new Notification(id,projectId,sectionId,tacheId,
        utilisateurService.getUtilisateur(id).getUserName() +
        " à changé la pondération de la tâche " +
        tache.getNom() +
        " dans la section " +
        sectionService.getSection(sectionId).getNom() +
        " du projet " +
        projetService.getProject(projectId).getNom() +
        " de " +
        ponderationPrecedente +
        " à " +
        ponderation +
        "."
        , new Date());
        notificationService.sendNotification(notification);
    }

    public void removeTacheSimple(String tache_id) {
        Tache tache = this.getTache(tache_id);
        this.tacheRepository.delete(tache);
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

    public Commentaire[] commentaires(String id) {
        CommentaireService commentaireService = context.getBean(CommentaireService.class);
        Tache tache = getTache(id);
        List<Commentaire> commentaires = new ArrayList<>();
        for (String commentaireId : tache.getCommentaires()) {
                commentaires.add(commentaireService.commentaire(commentaireId));
        }
        System.out.println("Commentaires : \n" + commentaires);
        Commentaire[] commentairesArray = new Commentaire[commentaires.size()];
        commentairesArray = commentaires.toArray(commentairesArray);
        return commentairesArray;
    }

    // Autres méthodes de service pour la gestion des tâches
}
