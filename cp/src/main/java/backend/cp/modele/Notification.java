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
    private Optional<String> sectionId = Optional.empty();
    private Optional<String> tacheId = Optional.empty();
    private String message;
    private Date createdAt;
    private Optional<String> parentId = Optional.empty();
    private Optional<ArrayList<Notification>> notificationsGenerated = Optional.empty();


    public Notification(String createurId, String projectId, String sectionId, String tacheId, String message, Date createdAt, String parentId){
        this.createurId = createurId;
        this.projectId = projectId;
        this.tacheId = Optional.of(tacheId);
        this.sectionId = Optional.of(sectionId);
        this.message = message;
        this.createdAt = createdAt;
        this.parentId = Optional.of(parentId);
    }

}
