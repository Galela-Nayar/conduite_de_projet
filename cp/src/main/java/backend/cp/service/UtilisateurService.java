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
        utilisateur.setEmail(email);

        utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur getUtilisateur(String ID){
        return utilisateurRepository.findByid(ID);
    }

    public boolean existUser(String email){
        Utilisateur user = utilisateurRepository.findByEmail(email);
        return user != null;
    }

    public boolean existUserName(String userName){
        Utilisateur user = utilisateurRepository.findByUserName(userName);
        return user != null;
    }

    public String connectMail(String email, String password){
        Utilisateur user = utilisateurRepository.findByEmail(email);
        if(user.getEmail().equals(email) && user.getPassword().equals(password)){
            return user.getId();
        }
        return "-1";
    }

    public String connectName(String username, String password){
        Utilisateur user = utilisateurRepository.findByUserName(username);
        if(user.getUserName().equals(username) && user.getPassword().equals(password)){
            return user.getId();
        }
        return "-1";
    }

    public void saveUtilisateur(Utilisateur utilisateur) {
        utilisateurRepository.save(utilisateur);
    }
}
 