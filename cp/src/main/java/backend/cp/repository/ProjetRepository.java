package backend.cp.repository;

import backend.cp.modele.Equipe;
import backend.cp.modele.Projet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;

public interface ProjetRepository extends MongoRepository<Projet, String> {
        Projet findByName(String name);

}
