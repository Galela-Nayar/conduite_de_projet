package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.List;

@Data
@Document(collection = "utilisateur")
public class Utilisateur {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String userName;
    private String password;
    private String mail;
    private List<String> listeProjet;
    private String bio;

}
