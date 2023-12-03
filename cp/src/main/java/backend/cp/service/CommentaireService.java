package backend.cp.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import backend.cp.modele.Commentaire;
import backend.cp.modele.Tache;
import backend.cp.repository.CommentaireRepository;
import backend.cp.repository.TacheRepository;

@Service
public class CommentaireService {

    @Autowired
    private final CommentaireRepository commentaireRepository;
    private final ApplicationContext applicationContext;

    @Autowired
    public CommentaireService(CommentaireRepository commentaireRepository, ApplicationContext applicationContext) {
        this.commentaireRepository = commentaireRepository;
        this.applicationContext = applicationContext;
    }

    public Commentaire commentaire(String idCommentaire) {
        return commentaireRepository.findById(idCommentaire).get();
    }

    public void addCommentaire( String createurId, Date createdAt, String message, String tacheId) {
        TacheService tacheService = applicationContext.getBean(TacheService.class);
        TacheRepository tacheRepository = applicationContext.getBean(TacheRepository.class);
        Commentaire commentaire = new Commentaire(createurId, createdAt, message, tacheId);
        commentaireRepository.save(commentaire);
        Tache tache = tacheService.getTache(tacheId);
        tache.addCommentaire(commentaire.getId());
        tacheRepository.save(tache);
    }

    public void save(Commentaire comentaire) {
        this.commentaireRepository.save(comentaire);
    }
}
