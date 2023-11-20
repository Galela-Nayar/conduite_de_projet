package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.List;

@Data
@Document(collection = "equipe")
public class Equipe {
    @Id
    private String id;

    private String name;

    private String color; 

    private List<String> colaborateurs; 

    public Equipe() {
        // Constructeur par défaut nécessaire pour MongoDB
    }

    public Equipe(String name, List<String> colaborateurs) {
        this.name = name;
        this.colaborateurs = colaborateurs;
    }

}
