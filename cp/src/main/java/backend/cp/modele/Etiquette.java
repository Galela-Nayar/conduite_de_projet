package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "etiquette")
public class Etiquette {

    @Id
    private String id;

    private String name;
    private String color;

    public Etiquette() {
    }

    public Etiquette(String name, String color) {
        this.name = name;
        this.color = color;
    }


}
