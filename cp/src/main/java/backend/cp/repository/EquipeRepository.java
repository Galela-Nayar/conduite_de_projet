package backend.cp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import backend.cp.modele.Equipe;

@Repository
public interface EquipeRepository extends MongoRepository<Equipe, String> {
}
