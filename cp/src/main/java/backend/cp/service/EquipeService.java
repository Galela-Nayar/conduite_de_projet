package backend.cp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import backend.cp.modele.Equipe;
import backend.cp.repository.EquipeRepository;

@Service
public class EquipeService {

    @Autowired
    private EquipeRepository equipeRepository;

    public void createEquipe(String name, String color) {
        Equipe equipe = new Equipe();
        equipe.setName(name);
        equipe.setColor(color);
        equipeRepository.save(equipe);
    }
}
