package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "utilisateur")
public class Utilisateur {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String userName;
    private String mail;
    private String miniature;
    private List<String> listeProjet;
    private List<String> amis;
    private String bio;
    private Map<String, String> notification;
    private Map<String, String> message;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getMiniature() {
        return miniature;
    }

    public void setMiniature(String miniature) {
        this.miniature = miniature;
    }

    public List<String> getListeProjet() {
        return listeProjet;
    }

    public void setListeProjet(List<String> listeProjet) {
        this.listeProjet = listeProjet;
    }

    public List<String> getAmis() {
        return amis;
    }

    public void setAmis(List<String> amis) {
        this.amis = amis;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Map<String, String> getNotification() {
        return notification;
    }

    public void setNotification(Map<String, String> notification) {
        this.notification = notification;
    }

    public Map<String, String> getMessage() {
        return message;
    }

    public void setMessage(Map<String, String> message) {
        this.message = message;
    }
}
