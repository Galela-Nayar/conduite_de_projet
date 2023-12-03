package backend.cp.repository;

import backend.cp.modele.Projet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjetRepository extends MongoRepository<Projet, String> {

}
