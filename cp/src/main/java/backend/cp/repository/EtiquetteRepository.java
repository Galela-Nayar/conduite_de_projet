package backend.cp.repository;


import backend.cp.modele.Etiquette;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EtiquetteRepository extends MongoRepository<Etiquette, String> {
}
