package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "equipe")
public class Equipe {
    @Id
    private String id;

    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    private String color;
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    private String colaborateur;
    public String getColaborateur() {
        return colaborateur;
    }
    public void setColaborateur(String colaborateur) {
        this.colaborateur = colaborateur;
    }

    // Getters et Setters pour les propriétés (name, color, colaborateur)
}