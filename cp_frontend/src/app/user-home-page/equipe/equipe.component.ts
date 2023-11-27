import { Component,OnInit } from '@angular/core';
import { EquipeService } from './equipe.service';
import { Equipe } from './equipe.model';


@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  /*equipes:Equipe[]=[];
  name: string = '';
*/
  equipes: any[] = [];
  newEquipeName: string = '';
  selectedEquipeId: string = '';
  collaborateurEmail: string = '';

  constructor(private equipeService: EquipeService) {}

  ngOnInit() {
    this.loadEquipes();
  }

  loadEquipes() {
    this.equipeService.getAllEquipes().subscribe(
      (data) => {
        this.equipes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des équipes', error);
      }
    );
  }

  createEquipe() {
    if (this.newEquipeName) {
      const newEquipe = {
        name: this.newEquipeName,
        color: '', // Ajoutez la logique pour la couleur si nécessaire
        collaborateurs: [],
      };

      this.equipeService.createEquipe(newEquipe).subscribe(
        (response) => {
          console.log('Équipe créée avec succès', response);
          this.loadEquipes(); // Mettez à jour la liste des équipes après la création réussie
          this.newEquipeName = ''; // Réinitialisez le champ du nom de l'équipe
        },
        (error) => {
          console.error('Erreur lors de la création de l\'équipe', error);
        }
      );
    }
  }

  addCollaborateur() {
    if (this.selectedEquipeId && this.collaborateurEmail) {
      this.equipeService.addCollaborateur(this.selectedEquipeId, this.collaborateurEmail).subscribe(
        (response) => {
          console.log('Collaborateur ajouté avec succès', response);
          this.loadEquipes(); // Mettez à jour la liste des équipes après l'ajout du collaborateur
          this.collaborateurEmail = ''; // Réinitialisez le champ de l'email du collaborateur
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du collaborateur', error);
        }
      );
    }
  }

  removeCollaborateur() {
    if (this.selectedEquipeId && this.collaborateurEmail) {
      this.equipeService.removeCollaborateur(this.selectedEquipeId, this.collaborateurEmail).subscribe(
        (response) => {
          console.log('Collaborateur supprimé avec succès', response);
          this.loadEquipes(); // Mettez à jour la liste des équipes après la suppression du collaborateur
          this.collaborateurEmail = ''; // Réinitialisez le champ de l'email du collaborateur
        },
        (error) => {
          console.error('Erreur lors de la suppression du collaborateur', error);
        }
      );
    }
  }

  deleteEquipe() {
    if (this.selectedEquipeId) {
      this.equipeService.deleteEquipe(this.selectedEquipeId).subscribe(
        (response) => {
          console.log('Équipe supprimée avec succès', response);
          this.loadEquipes(); // Mettez à jour la liste des équipes après la suppression réussie
          this.selectedEquipeId = ''; // Réinitialisez l'équipe sélectionnée
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'équipe', error);
        }
      );
    }
  }

}
