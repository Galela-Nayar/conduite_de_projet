package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Data;

import java.util.List;

@Data
@Document(collection = "utilisateur")
public class Utilisateur {
    @Id
    private String id;
    private String password;
    
    @Indexed(unique = true)
    private String email;
    private String nom;
    private String prenom;
    private String userName;
    private List<String> listeProjet;
    private String bio;

}
