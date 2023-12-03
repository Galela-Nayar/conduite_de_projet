package backend.cp.repository;

import backend.cp.modele.Tache;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TacheRepository extends MongoRepository<Tache, String> {
        List<Tache> findByProjectId(String projectId);

}
