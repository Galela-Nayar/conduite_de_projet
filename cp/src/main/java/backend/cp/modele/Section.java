package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "section")
public class Section {
    @Id
    private String id = UUID.randomUUID().toString();
    private String nom;
    private List<String> taches = new ArrayList<>();

    public Section(String nom){
        this.nom = nom;
    }

    public void addTache(String tacheId) {
        taches.add(tacheId);
    }
}
