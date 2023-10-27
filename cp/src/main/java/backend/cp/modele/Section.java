package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.List;

@Data
@Document(collection = "section")
public class Section {
    @Id
    private String id;
    private String name;
    private List<Tache> taches;

  
}
