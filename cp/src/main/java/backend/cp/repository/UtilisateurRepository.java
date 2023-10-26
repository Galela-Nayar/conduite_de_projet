package backend.cp.repository;

import backend.cp.modele.Utilisateur;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UtilisateurRepository extends MongoRepository<Utilisateur, String> {
    // Vous pouvez ajouter des méthodes personnalisées pour accéder aux utilisateurs si nécessaire
}
