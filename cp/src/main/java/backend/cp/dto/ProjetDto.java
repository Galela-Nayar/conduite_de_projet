package backend.cp.dto;

import java.util.Date;


import lombok.Data;

@Data
public class ProjetDto {
    
    private String nom;
    private String createur; // ID de l'utilisateur créateur
    private Date date;
    private boolean standardSection;
    private String description;
    private Date dateButoire;
    private String etat;
}
