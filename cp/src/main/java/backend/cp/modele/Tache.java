package backend.cp.modele;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "tache")
public class Tache {
    @Id
    private String id;
    private String name;
    private List<String> membreAttribue;
    private List<String> equipeAttitre;
    private int priorite;
    private int ponderation;
    private String statut;
    private Date dateLimite;
    private List<String> description;
    private List<Etiquette> etiquettes;

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

    public List<String> getMembreAttribue() {
        return membreAttribue;
    }

    public void setMembreAttribue(List<String> membreAttribue) {
        this.membreAttribue = membreAttribue;
    }

    public List<String> getEquipeAttitre() {
        return equipeAttitre;
    }

    public void setEquipeAttitre(List<String> equipeAttitre) {
        this.equipeAttitre = equipeAttitre;
    }

    public int getPriorite() {
        return priorite;
    }

    public void setPriorite(int priorite) {
        this.priorite = priorite;
    }

    public int getPonderation() {
        return ponderation;
    }

    public void setPonderation(int ponderation) {
        this.ponderation = ponderation;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Date getDateLimite() {
        return dateLimite;
    }

    public void setDateLimite(Date dateLimite) {
        this.dateLimite = dateLimite;
    }

    public List<String> getDescription() {
        return description;
    }

    public void setDescription(List<String> description) {
        this.description = description;
    }

    public List<Etiquette> getEtiquettes() {
        return etiquettes;
    }

    public void setEtiquettes(List<Etiquette> etiquettes) {
        this.etiquettes = etiquettes;
    }
}
