package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "tache")
public class Tache {
    @Id
    private String id = UUID.randomUUID().toString();
    private String nom = "";
    private List<String> membreAttribue = new ArrayList<>();
    private List<String> equipeAttitre = new ArrayList<>();
    private int priorite;
    private int ponderation;
    private boolean statutTerminer = false;
    private Date dateLimite;
    private List<String> description = new ArrayList<>();
    private List<Etiquette> etiquettes = new ArrayList<>();
 
    public Tache(String nom) {
        this.nom = nom;
    }

    public void swapStatut() {
        this.statutTerminer = !statutTerminer;
    }
}
