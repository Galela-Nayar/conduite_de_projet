package backend.cp.controller;

import backend.cp.dto.UtilisateurDto;
import backend.cp.modele.Utilisateur;
import backend.cp.service.UtilisateurService;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.imgscalr.Scalr;

import javax.imageio.ImageIO;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.geom.Area;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.InputStream;


@RestController
@CrossOrigin(origins = "http://localhost:4200") // replace with the domain your frontend is running on
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @Autowired
    public UtilisateurController(UtilisateurService sectionService) {
        this.utilisateurService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
        System.out.println(utilisateurDto.getNom() +"     "+ utilisateurDto.getPrenom()+"     "+ utilisateurDto.getUsername()+"     "+ utilisateurDto.getEmail()+"     "+ utilisateurDto.getPassword());
        if(utilisateurService.existUser(utilisateurDto.getEmail()) == true){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exist.");
        }
        if(utilisateurService.existUserName(utilisateurDto.getUsername()) == true){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exist.");
        }
        utilisateurService.createUtilisateur(utilisateurDto.getNom(), utilisateurDto.getPrenom(), utilisateurDto.getUsername(), utilisateurDto.getEmail(), utilisateurDto.getPassword());
        return ResponseEntity.ok("Entité Utilisateur créée avec succès.");
    }

    @GetMapping("/login")
    public String loginUtilisateur(@RequestParam String email, @RequestParam String password){
        if(utilisateurService.existUser(email) == true){
            return utilisateurService.connectMail(email, password);
        }
        if(utilisateurService.existUserName(email) == true){
            return utilisateurService.connectName(email, password);
        }
        return "-0";
    }

    @GetMapping("/projects")
    public List<String> projects(@RequestParam String id){
        return utilisateurService.getUtilisateur(id).getListProjet();
    }

    @GetMapping("/add-projet")
    public ResponseEntity<String> addProjet(@RequestParam String userId, @RequestParam String projetId){
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        user.addProjet(projetId);
        utilisateurService.saveUtilisateur(user);  // save the updated user back to the database

        return ResponseEntity.ok("project add");
    }

    @GetMapping("/user")
    public Utilisateur user(@RequestParam String id){
        return utilisateurService.getUtilisateur(id);
    }

    @GetMapping("/add_ami")
    public ResponseEntity<String> addAmi(@RequestParam String id,@RequestParam String idAmi){
        if(utilisateurService.existUserName(idAmi) == false){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Utilisateur didn't exist.");
        }
        utilisateurService.addAmi(id,idAmi);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_userName")
    public ResponseEntity<String> setNomUtilisateur(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.existUserName(param) == true){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exist.");
        }
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setUserName(id,param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_nom")
    public ResponseEntity<String> setNom(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setNom(id, param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_prenom")
    public ResponseEntity<String> setPrenom(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setPrenom(id,param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_email")
    public ResponseEntity<String> setEmail(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.existUser(param) == true){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exist.");
        }
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setEmail(id, param);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/set_bio")
    public ResponseEntity<String> setBio(@RequestParam String id, @RequestParam String param){
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        utilisateurService.setBio(id, param);
        return ResponseEntity.ok("ok");
    }
   

    @PostMapping("/set_logo")
    public ResponseEntity<String> setLogo(@RequestParam String id, @RequestParam("file") MultipartFile file) {
        if(utilisateurService.getUtilisateur(id) == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("utilisateur not found");
        byte[] logo = this.resizeAndCropImage(file);
        utilisateurService.setLogo(id, logo);
        return ResponseEntity.ok("Logo updated successfully");
    }



public byte[] resizeAndCropImage(MultipartFile file) {
    try {
        InputStream inputStream = file.getInputStream();
        BufferedImage originalImage = ImageIO.read(inputStream);
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int x, y, cropWidth, cropHeight;
        if(width > height) {
            x = (width - height) / 2;
            y = 0;
            cropWidth = cropHeight = height;
        } else {
            x = 0;
            y = (height - width) / 2;
            cropWidth = cropHeight = width;
        }
        BufferedImage croppedImage = Scalr.crop(originalImage, x, y, cropWidth, cropHeight);
        BufferedImage resizedImage = Scalr.resize(croppedImage, Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, 100, 100, Scalr.OP_ANTIALIAS);
        
        // Create a circular shape
        Ellipse2D.Double shape = new Ellipse2D.Double(0, 0, resizedImage.getWidth(), resizedImage.getHeight());

        // Prepare output image
        BufferedImage circularImage = new BufferedImage(resizedImage.getWidth(), resizedImage.getHeight(), BufferedImage.TYPE_INT_ARGB);

        // Prepare graphics for drawing
        Graphics2D g2d = circularImage.createGraphics();

        // Set transparency of the area outside the circle
        g2d.setComposite(AlphaComposite.Clear);

        // Fill the entire image with transparency
        g2d.fillRect(0, 0, resizedImage.getWidth(), resizedImage.getHeight());

        // Change composite rules
        g2d.setComposite(AlphaComposite.Src);

        // Draw the circular image
        g2d.setClip(new Area(shape));
        g2d.drawImage(resizedImage, 0, 0, null);

        g2d.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(circularImage, "png", baos);
        byte[] bytes = baos.toByteArray();
        originalImage.flush();
        croppedImage.flush();
        resizedImage.flush();
        return bytes;
    } catch (IOException e) {
        e.printStackTrace();
    }
    return null;
    }

    @GetMapping("/img")
    public ResponseEntity<InputStreamResource> getImage(@RequestParam String id) throws IOException {
        if(utilisateurService.getUtilisateur(id) == null) return null;
        Utilisateur user = utilisateurService.getUtilisateur(id);
        byte[] logo = user.getLogo_utilisateur();
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_PNG) // Change this if the image format is not JPEG
            .body(new InputStreamResource(new ByteArrayInputStream(logo)));
    }
}
