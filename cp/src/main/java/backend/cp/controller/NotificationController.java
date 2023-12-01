package backend.cp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.cp.modele.Notification;
import backend.cp.service.NotificationService;
import backend.cp.service.UtilisateurService;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // replace with the domain your frontend is running on
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    private final SimpMessagingTemplate template;

    @Autowired
    public NotificationController(SimpMessagingTemplate template, NotificationService notificationService) {
        this.template = template;
        this.notificationService = notificationService;
    }

    @PostMapping("/notification")
    public void sendNotification(Notification notification) {
        notificationService.sendNotification(notification);
    }

    @GetMapping("/notification")
    public Notification getNotification(@RequestParam String id){
        return notificationService.getNotification(id);
    }

    @GetMapping("/notifications")
    public Notification[] getNotifications(@RequestParam String userId){
        return notificationService.getNotifications(userId);
    }


}