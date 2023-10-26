package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "equipe")
public class Equipe {
    @Id
    private String id;

    private String name;
    private String color; // Utilisez ici un format de couleur (par exemple : "#RRGGBB")
    private List<String> colaborateurs; 

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getCollaborateurs() {
        return colaborateurs;
    }

    public void setColaborateur(List<String> colaborateur) {
        this.colaborateurs = colaborateur;
    }
}
