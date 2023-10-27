package backend.cp.service;

import backend.cp.modele.Utilisateur;
import backend.cp.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public void createUtilisateur(
        String nom,
        String prenom,
        String username,
        String email,
        String password
        
    ) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(nom);
        utilisateur.setPrenom(prenom);
        utilisateur.setUserName(username);
        utilisateur.setPassword(password);
        utilisateur.setMail(email);

        utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // Autres méthodes de service pour la gestion des utilisateurs
}
