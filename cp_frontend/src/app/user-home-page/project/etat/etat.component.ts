import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Section from 'src/interface/Section';
import { BehaviorSubject, Subscription, mergeMap} from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../create-task/create-task.component';
import Project from 'src/interface/Project';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent {
  etatActuel: String = '';

  options: String[] = ['Démarrage', 'En cours', 'En pause', 'Terminé'];

  id: String = '';
  projetId: String | null = '';
  projet?: Project;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private route: ActivatedRoute, private observableService: ObservableService, public dialog: MatDialog) {}


  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id != null) this.id = id;
    const projetId = this.route.snapshot.paramMap.get('projectId');
    if(projetId != null){
      this.projetId = projetId;
      this.http.get<Project>(`http://localhost:8080/projets/projet?id=${this.projetId}`).subscribe((projectData: Project)=>{
          this.projet = projectData;
          this.etatActuel = this.projet.etat;
        });
    }
  }

  changerEtat(): void {
    console.log('Nouvel état sélectionné :', this.etatActuel);

    this.http.get('http://localhost:8080/projets/updateEtat?id=${this.projectId}&newEtat=${this.etatActuel}', {responseType: 'text'}).subscribe(
      (response) => {
        console.log('État mis à jour dans la base de données :', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'état dans la base de données', error);
      }
    );
  }
}
