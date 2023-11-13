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
  etatActuel: string = '';

  options: string[] = ['Démarrage', 'En_cours', 'En_pause', 'Terminé'];

  id: string = '';
  projetId: string = '';
  projet?: Project;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private projectService: ObservableService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id != null) this.id = id;
    this.route.paramMap.subscribe((param) => {
      const projetId = param.get('projectId');
      console.log(projetId);
      if (projetId != null) {
        this.projetId = projetId;
        this.http
          .get<Project>(
            `http://localhost:8080/projets/projet?id=${this.projetId}`).subscribe((projectData: Project) => {
              this.projet = projectData;
              this.etatActuel = this.projet.etat;
              console.log('Etat bien recupéré');});
      };
  })}

  changerEtat(): void {
    console.log('Nouvel état sélectionné :', this.etatActuel);
    this.http.put(`http://localhost:8080/projets/updateEtat?id=${this.projetId}&newEtat=${this.etatActuel}`,{}).subscribe(
      (response) => {
        this.projectService.notifyProject();
      }
    );
  }
}
