package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.List;

@Data
@Document(collection = "label")
public class Label {
    @Id
    private String id;
    
    private String name;

    private String color;

    private List<String> collaborateursEquipe;

}
