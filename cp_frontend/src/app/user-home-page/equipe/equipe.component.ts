import { Component, OnInit } from '@angular/core';
import { EquipeService } from './equipe.service';
import { Equipe } from './equipe.model';
import { ModifierCollaborateurComponent } from '../project/section-scrum/tache-scrum/modifier-collaborateur/modifier-collaborateur.component';
import Utilisateur from 'src/interface/Utilisateur';
import { HttpClient } from '@angular/common/http';
import { EquipeTacheComponent } from './equipe-tache/equipe-tache.component';
import { Router } from '@angular/router';
import Tache from 'src/interface/Tache';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  equipes!: any[];
  projets!: any[];

  newEquipeName: string = '';
  selectedEquipeId: string = '';
  selectedProjetId: string = '';
  selectedTacheId: string; 

  collaborateurEmail: string = '';
  dialog: any;
  projetId: any;
  id!: String;
  tacheId!: String;
  sectionId!: String;
  liste1!: Utilisateur[];
  emails!: string[];
  liste2!: Utilisateur[];
  utilisateurService!: any;
  noms!: string[];
  projectNames: string[];
  selectedProjectTaches: Tache[];


  constructor(private equipeService: EquipeService, private http: HttpClient, private router: Router  ) {}

  ngOnInit() {
    this.loadEquipes();
    this.http.get<Utilisateur[]>(`http://localhost:8080/utilisateurs/liste`).subscribe((data: Utilisateur[]) => {
        this.liste1 = data;
        console.log("liste1 : " + this.liste1);
        // Extraire les e-mails et les stocker dans la variable 'emails'
        this.emails = this.liste1.map(utilisateur => utilisateur.email);
    })
   
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

  onProjectSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const projectId = selectElement.value;
    this.equipeService.getProjectTaches(projectId).subscribe(taches => {
        this.selectedProjectTaches = taches;
    });
}

onEquipeSelected(tacheId: string, event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const equipeId = selectElement.value;
  this.equipeService.assignTacheToEquipe(tacheId, equipeId).subscribe(() => {
    console.log('La tâche a été assignée avec succès à l\'équipe');
    // handle success
    this.loadEquipes();
  });
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

     
  navigateEquipeToTache() {
    this.router.navigate([`/${this.id}/equipe-tache`]);
  }


}
