package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "tache")
public class Tache {
    @Id
    private String id;
    private String nom = "";
    private List<String> membreAttribue;
    private List<String> equipeAttitre;
    private int priorite;
    private int ponderation;
    private boolean statutTerminer;
    private Date dateLimite;
    private Date dateCreation;
    private List<String> description;
    private List<String> etiquettes;
    private List<String> commentaires;
 
    public Tache(String nom) {
        this.id  = UUID.randomUUID().toString();
        this.nom = nom;
        this.membreAttribue  = new ArrayList<>();
        this.equipeAttitre = new ArrayList<>();
        this.priorite = 0;
        this.ponderation = 0;
        this.statutTerminer = false;
        this.description = new ArrayList<>();
        this.etiquettes = new ArrayList<>();
        this.commentaires = new ArrayList<>();
        this.dateCreation = java.sql.Date.valueOf(LocalDate.now());
    }

    public void swapStatut() {
        this.statutTerminer = !statutTerminer;
    }

    public void addCommentaire(String commentaireId) {
        commentaires.add(commentaireId);
    }
}
