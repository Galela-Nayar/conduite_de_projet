package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "projet")
public class Projet {
    @Id
    private String id; // ID du projet

    private String nom;
    private int createur; // ID de l'utilisateur créateur
    private Date dateCreation; // Date de création au format souhaité
    private List<Section> sections; // Liste des sections
    private List<Tache> taches; // Liste des tâches
    private List<Integer> collaborateurs; // Liste des ID des collaborateurs (utilisateurs)
    private List<Label> labels; // Liste des labels
    private List<Equipe> equipe; // Liste des équipes
    private String description; // Description du projet, texte ou référence à des fichiers
    private Date dateButtoire; // Date d'échéance au format souhaité
    private Map<Integer, String> droitUtilisateur; // Gestion des droits des utilisateurs

    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getCreateur() {
        return createur;
    }
    public void setCreateur(int createur) {
        this.createur = createur;
    }

    public Date getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public List<Section> getSections() {
        return sections;
    }
    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    public List<Tache> getTaches() {
        return taches;
    }
    public void setTaches(List<Tache> taches) {
        this.taches = taches;
    }

    public List<Integer> getCollaborateurs() {
        return collaborateurs;
    }
    public void setCollaborateurs(List<Integer> collaborateurs) {
        this.collaborateurs = collaborateurs;
    }

    public List<Label> getLabels() {
        return labels;
    }
    public void setLabels(List<Label> labels) {
        this.labels = labels;
    }

    public List<Equipe> getEquipe() {
        return equipe;
    }
    public void setEquipe(List<Equipe> equipe) {
        this.equipe = equipe;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateButtoire() {
        return dateButtoire;
    }
    public void setDateButtoire(Date dateButtoire) {
        this.dateButtoire = dateButtoire;
    }

    public Map<Integer, String> getDroitUtilisateur() {
        return droitUtilisateur;
    }
    public void setDroitUtilisateur(Map<Integer, String> droitUtilisateur) {
        this.droitUtilisateur = droitUtilisateur;
    }
}
