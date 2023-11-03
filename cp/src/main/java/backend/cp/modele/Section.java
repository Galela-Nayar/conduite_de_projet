package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "section")
public class Section {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private List<Tache> taches;

    public Section(String nom){
        name = nom;
    }
}
