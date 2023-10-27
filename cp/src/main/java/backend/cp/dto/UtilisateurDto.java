package backend.cp.dto;

import java.util.List;

import lombok.Data;

@Data
public class UtilisateurDto {

    private String nom;
    private String prenom;
    private String userName;
    private String password;
    private String mail;
    private List<String> listeProjet;
    private String bio;

}
