package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import ch.qos.logback.core.pattern.color.BoldBlueCompositeConverter;
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
    private Boolean estEtat;

    public Section(String nom, Boolean estEtat){
        this.nom = nom;
        this.estEtat = estEtat;
    }

    public void addTache(String tacheId) {
        taches.add(tacheId);
    }
}
