package backend.cp.modele;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "projet")
public class Projet {
    @Id
    private String id; // ID du projet

    private String nom;
    private String createur; // ID de l'utilisateur créateur
    private Date dateCreation; // Date de création au format souhaité
    private List<Section> sections; // Liste des sections
    private List<Tache> taches; // Liste des tâches
    private List<String> collaborateurs; // Liste des ID des collaborateurs (utilisateurs)
    private List<Label> labels; // Liste des labels
    private List<Equipe> equipe; // Liste des équipes
    private String description; // Description du projet, texte ou référence à des fichiers
    private Date dateButtoire; // Date d'échéance au format souhaité
    private Map<Integer, String> droitUtilisateur; // Gestion des droits des utilisateurs


}
