package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "label")
public class Label {
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
    
    private List<String> collaborateursEquipe;
    public List<String> getCollaborateursEquipe() {
        return collaborateursEquipe;
    }
    public void setCollaborateursEquipe(List<String> collaborateursEquipe) {
        this.collaborateursEquipe = collaborateursEquipe;
    }

    public void setId(String id2) {
        collaborateursEquipe.add(id2);
    }
}
