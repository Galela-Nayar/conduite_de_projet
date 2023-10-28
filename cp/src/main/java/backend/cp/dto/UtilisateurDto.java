package backend.cp.dto;

import java.util.List;

import lombok.Data;

@Data
public class UtilisateurDto {

    private String nom;
    private String prenom;
    private String username;
    private String password;
    private String email;
    private List<String> listeProjet;
    private String bio;

}
