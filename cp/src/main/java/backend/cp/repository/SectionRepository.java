package backend.cp.repository;

import backend.cp.modele.Section;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SectionRepository extends MongoRepository<Section, String> {

}
