package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import lombok.Data;

@Data
@Document(collection = "notification")
public class Notification {
    @Id
    private String id = UUID.randomUUID().toString();
    private String createurId;
    private String projectId;
    private String sectionId = null;
    private String tacheId = null;
    private String message;
    private Date createdAt;
    private String parentId = null;
    private ArrayList<String> notificationsGenerated = null;


    public Notification(String createurId, String projectId, String sectionId, String tacheId, String message, Date createdAt, String parentId){
        this.createurId = createurId;
        this.projectId = projectId;
        this.tacheId = tacheId;
        this.sectionId = sectionId;
        this.message = message;
        this.createdAt = createdAt;
        this.parentId = parentId;
    }

    public Notification(String createurId, String projectId, String sectionId, String tacheId, String message, Date createdAt){
        this.createurId = createurId;
        this.projectId = projectId;
        this.tacheId = tacheId;
        this.sectionId = sectionId;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Notification(String createurId, String projectId, String sectionId, String message, Date createdAt){
        this.createurId = createurId;
        this.projectId = projectId;
        this.sectionId = sectionId;
        this.message = message;
        this.createdAt = createdAt;
    }


    public Notification(String createurId, String projectId, String message, Date createdAt){
        this.createurId = createurId;
        this.projectId = projectId;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Notification() {
    }

}
