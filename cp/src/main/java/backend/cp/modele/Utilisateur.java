package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "utilisateur")
public class Utilisateur {
    @Id
    private String id = UUID.randomUUID().toString();
    private String password;
    
    @Indexed(unique = true)
    private String email;
    private String nom;
    private String prenom;
    private String userName;
    private List<String> listProjet = new ArrayList<>();
    private String bio;
    private byte[] logo_utilisateur;

    public void addProjet(String id){
        listProjet.add(id);
    }

    public void removeProject(String id2) {
        listProjet.remove(id2);
    }

}
