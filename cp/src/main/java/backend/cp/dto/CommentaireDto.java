package backend.cp.dto;

import java.util.Date;

import lombok.Data;

@Data
public class CommentaireDto {

    private String id;
    private String createurId;
    private String tacheId;
    private String message;
    private Date createdAt;
    
}
