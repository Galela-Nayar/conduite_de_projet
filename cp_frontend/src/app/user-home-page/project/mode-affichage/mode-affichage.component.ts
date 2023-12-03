import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Section from 'src/interface/Section';
import { BehaviorSubject, Subscription, mergeMap} from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../create-task/create-task.component';
import Project from 'src/interface/Project';

@Component({
  selector: 'app-mode-affichage',
  templateUrl: './mode-affichage.component.html',
  styleUrls: ['./mode-affichage.component.css']
})
export class ModeAffichageComponent {
  affichageActuel: string = '';

  options: string[] = ['Kanban', 'Scrum'];

  id: string = '';
  projetId: string = '';
  projet?: Project;

  @Output() affichageChange: EventEmitter<string> = new EventEmitter<string>();

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
              this.affichageActuel = this.projet.modeAffichage;});
      };
  })}

  //Dans cette fonction on change la valeur de modeAffichage dans la bdd, puis on previent le projet qu'il faut changer l'affichage
  changerAffichage(): void {
    console.log('Nouvel état sélectionné :', this.affichageActuel);

    this.http
      .get(
        `http://localhost:8080/projets/updateModeAffichage?id=${this.projetId}&newModeAffichage=${this.affichageActuel}`,
        {responseType: 'text'}).subscribe((data: string) => {
          if (data.toString().startsWith('ok')) {
            this.projectService.notifyProject();
            this.projectService.notifyTask();
          }
        });


      this.affichageChange.emit(this.affichageActuel);

  }
}
