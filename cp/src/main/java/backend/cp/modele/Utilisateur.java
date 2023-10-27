package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;
@Document(collection = "utilisateur")
public class Utilisateur {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String userName;
    private String password;
    private String mail;
    private List<UUID> listeProjet;
    private String bio;


     public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }


    public List<UUID> getListeProjet() {
        return listeProjet;
    }

    public void setListeProjet(List<UUID> listeProjet) {
        this.listeProjet = listeProjet;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
