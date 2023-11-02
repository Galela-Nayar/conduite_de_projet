package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Document(collection = "projet")
public class Projet {
    @Id
    private String id = UUID.randomUUID().toString(); // ID du projet

    private String nom;
    private String createur; // ID de l'utilisateur créateur
    private Date dateCreation; // Date de création au format souhaité
    private List<String> sections = new ArrayList<>(); // Liste des sections
    private List<String> taches = new ArrayList<>(); // Liste des tâches
    private List<String> collaborateurs = new ArrayList<>(); // Liste des ID des collaborateurs (utilisateurs)
    private List<String> labels = new ArrayList<>(); // Liste des labels
    private List<String> equipe = new ArrayList<>(); // Liste des équipes
    private String description; // Description du projet, texte ou référence à des fichiers
    private Date dateButtoire; // Date d'échéance au format souhaité
    private Map<Integer, String> droitUtilisateur = new HashMap<>(); // Gestion des droits des utilisateurs
    
    public void addSection(String section) {
        sections.add(section);
    }


}
