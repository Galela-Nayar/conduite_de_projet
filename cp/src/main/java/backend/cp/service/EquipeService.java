package backend.cp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import backend.cp.EquipeRepository;
import backend.cp.modele.Equipe;

@Service
public class EquipeService {

    @Autowired
    private EquipeRepository equipeRepository;

    public Equipe createEquipe(@RequestParam String name, @RequestParam String color, @RequestParam String colaborateur) {
        Equipe equipe = new Equipe();
        equipe.setName(name);
        equipe.setColor(color);
        equipe.setColaborateur(colaborateur);
        return equipeRepository.save(equipe);
    }
}
