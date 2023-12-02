package backend.cp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.cp.dto.CommentaireDto;
import backend.cp.dto.UtilisateurDto;
import backend.cp.modele.Commentaire;
import backend.cp.service.CommentaireService;

@RestController
@RequestMapping("/commentaires")
public class CommentaireControlleur {



    @Autowired
    private CommentaireService commentaireService;

    @GetMapping("/commentaire")
    public Commentaire commentaire(@RequestParam String idCommentaire){
        return commentaireService.commentaire(idCommentaire);
    }

    @PostMapping("/add_commentaire")
    public ResponseEntity<String> addCommentaire(@RequestBody CommentaireDto commentaireDto) {
        commentaireService.addCommentaire(commentaireDto.getCreateurId(), commentaireDto.getCreatedAt(), commentaireDto.getMessage(), commentaireDto.getTacheId());
        return ResponseEntity.ok("ok");
    }
    
}
