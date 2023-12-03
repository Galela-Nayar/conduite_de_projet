package backend.cp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import backend.cp.modele.Commentaire;

@Repository
public interface CommentaireRepository extends MongoRepository<Commentaire, String> {
}
