package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "tache")
public class Tache {
    @Id
    private String id;
    private String name;
    private List<String> membreAttribue;
    private List<String> equipeAttitre;
    private int priorite;
    private int ponderation;
    private String statut;
    private Date dateLimite;
    private List<String> description;
    private List<Etiquette> etiquettes;

 
}
