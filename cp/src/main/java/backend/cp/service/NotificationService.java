package backend.cp.service;

import java.util.ArrayList;

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
        SectionService sectionService = context.getBean(SectionService.class);
        ProjetService projetService = context.getBean(ProjetService.class);
        UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);

        if(notification.getTacheId().isPresent()){
            ArrayList<Notification> notificationsEnfant = new ArrayList<>();
            for(Utilisateur membreAttribueId : tacheService.membreAttribue(notification.getTacheId().get())){
                Notification notificationEnfant = new Notification(notification.getCreateurId(),notification.getProjectId(),notification.getSectionId().get(),notification.getTacheId().get(),notification.getMessage(),notification.getCreatedAt(), notification.getId());
                utilisateurService.addNotification(membreAttribueId.getId(), notificationEnfant);
                notificationRepository.save(notificationEnfant);
                notificationsEnfant.add(notificationEnfant);
            }
        } else if(notification.getSectionId().isPresent()){
            ArrayList<Notification> notificationsEnfant = new ArrayList<>();
            for(Utilisateur collaborateur : projetService.collaborateurs(notification.getProjectId())){
                if(projetService.droitUtilisateur(collaborateur.getId(), notification.getProjectId()) != "Visiteur"){
                    Notification notificationEnfant = new Notification(notification.getCreateurId(),notification.getProjectId(),notification.getSectionId().get(),notification.getTacheId().get(),notification.getMessage(),notification.getCreatedAt(), notification.getId());
                    notificationRepository.save(notificationEnfant);
                    utilisateurService.addNotification(collaborateur.getId(), notificationEnfant);
                    notificationsEnfant.add(notificationEnfant);
                }
            }
        } else{
            ArrayList<Notification> notificationsEnfant = new ArrayList<>();
            for(Utilisateur collaborateur : projetService.collaborateurs(notification.getProjectId())){
                if(projetService.droitUtilisateur(collaborateur.getId(), notification.getProjectId()) != "Visiteur"){
                    Notification notificationEnfant = new Notification(notification.getCreateurId(),notification.getProjectId(),notification.getSectionId().get(),notification.getTacheId().get(),notification.getMessage(),notification.getCreatedAt(), notification.getId());
                    notificationRepository.save(notificationEnfant);
                    utilisateurService.addNotification(collaborateur.getId(), notificationEnfant);
                    notificationsEnfant.add(notificationEnfant);
                }
            }
        }
        notificationRepository.save(notification);

    }
    
}
