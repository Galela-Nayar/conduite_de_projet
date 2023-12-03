package backend.cp.modele;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "commentaire")
public class Commentaire {
    @Id
    private String id = UUID.randomUUID().toString();
    private String createurId;
    private String tacheId;
    private String message;
    private Date createdAt;
    

    public Commentaire(String createurId, Date createdAt, String message, String tacheId) {
        this.tacheId = tacheId;
        this.createurId = createurId;
        this.message = message;
        this.createdAt = createdAt;
    }
}
