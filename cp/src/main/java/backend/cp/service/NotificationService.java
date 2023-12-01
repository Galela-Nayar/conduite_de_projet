package backend.cp.service;

import java.awt.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import backend.cp.modele.Notification;
import backend.cp.modele.Utilisateur;
import backend.cp.repository.NotificationRepository;

@Service
public class NotificationService {

    private final ApplicationContext context;
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, ApplicationContext context) {
        this.context = context;
        this.notificationRepository = notificationRepository;
    }

    public void sendNotification(Notification notification){
        TacheService tacheService = context.getBean(TacheService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        
        ArrayList<String> notificationsEnfant = new ArrayList<>();

        if(notification.getTacheId() != null){
            for(Utilisateur membreAttribueId : tacheService.membreAttribue(notification.getTacheId())){
                if(membreAttribueId.getId() != notification.getCreateurId()){
                    System.out.println("membre qui recoit la notif : " + membreAttribueId.getId());
                    Notification notificationEnfant = new Notification(notification.getCreateurId(),notification.getProjectId(),notification.getSectionId(),notification.getTacheId(),notification.getMessage(),notification.getCreatedAt(), notification.getId());
                    utilisateurService.addNotification(membreAttribueId.getId(), notificationEnfant.getId());
                    notificationRepository.save(notificationEnfant);
                    notificationsEnfant.add(notificationEnfant.getId());
                }
            }
        } else if(notification.getSectionId() != null){
            for(Utilisateur collaborateur : projetService.collaborateurs(notification.getProjectId())){
                if(collaborateur.getId() != notification.getCreateurId()){
                    if(projetService.droitUtilisateur(collaborateur.getId(), notification.getProjectId()) != "Visiteur"){
                        Notification notificationEnfant = new Notification(notification.getCreateurId(),notification.getProjectId(),notification.getSectionId(),notification.getTacheId(),notification.getMessage(),notification.getCreatedAt(), notification.getId());
                        notificationRepository.save(notificationEnfant);
                        utilisateurService.addNotification(collaborateur.getId(), notificationEnfant.getId());
                        notificationsEnfant.add(notificationEnfant.getId());
                    }
                }
            }
        } else{
            for(Utilisateur collaborateur : projetService.collaborateurs(notification.getProjectId())){
                if(collaborateur.getId() != notification.getCreateurId()){
                    if(projetService.droitUtilisateur(collaborateur.getId(), notification.getProjectId()) != "Visiteur"){
                        Notification notificationEnfant = new Notification(notification.getCreateurId(),notification.getProjectId(),notification.getSectionId(),notification.getTacheId(),notification.getMessage(),notification.getCreatedAt(), notification.getId());
                        notificationRepository.save(notificationEnfant);
                        utilisateurService.addNotification(collaborateur.getId(), notificationEnfant.getId());
                        notificationsEnfant.add(notificationEnfant.getId());
                    }
                }
            }
        }
        notification.setNotificationsGenerated(notificationsEnfant);
        notificationRepository.save(notification);

    }

    public Notification getNotification(String id) {
        Optional<Notification> notif = notificationRepository.findById(id);
        if(notif.isPresent()){
            return notif.get();
        }
        return null;
    }

    public Notification[] getNotifications(String userId) {
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
        ArrayList<String> notificationsId = utilisateurService.getUtilisateur(userId).getNotifications();
        ArrayList<Notification> notificationsArray = new ArrayList<>();
        for (String notificationId : notificationsId) {
            Optional<Notification> notification = notificationRepository.findById(notificationId);
            if(notification.isPresent()) {
                notificationsArray.add(notification.get());
            }
        }
        Notification[] notifications = new Notification[notificationsArray.size()];
        notifications = notificationsArray.toArray(notifications);
        return notifications;
    }

    public void removeFromParent(String notificationId) {
        Notification notif = notificationRepository.findById(notificationId).get();
        Notification notifParent = notificationRepository.findById(notif.getParentId()).get();
        notifParent.getNotificationsGenerated().remove(notif.getId());
        notificationRepository.deleteById(notif.getId());
        if(notifParent.getNotificationsGenerated().size() == 0){
            notificationRepository.deleteById(notifParent.getId());
        }
    }

    
    
}
