package backend.cp.dto;

import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Data;

@Data
public class UtilisateurDto {
    private String id;
    private String nom;
    private String prenom;
    private String username;
    private String password;
    @Indexed(unique = true)
    private String email;
    private List<String> listeProjet;
    private String bio;

}
