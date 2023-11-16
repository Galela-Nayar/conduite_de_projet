import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Project from 'src/interface/Project';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import { CreateSectionComponent } from '../create-section/create-section.component';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CreateEtatComponent } from '../create-etat/create-etat.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnDestroy {
  id: string = '';
  projetId: string = '';
  projet?: Project;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateSection = false;
  dataLoad = false;
  sections: any[] = [];
  etats: any[] = [];
  sectionSubscription!: Subscription;
  modeAffichage: String = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private observableService: ObservableService,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  ngOnInit() {
    const id = this.route.parent
      ? this.route.parent.snapshot.paramMap.get('id')
      : null;
    if (id != null) this.id = id;
    this.route.paramMap.subscribe((param) => {
      const projetId = param.get('projectId');
      console.log(projetId);
      if (projetId != null) {
        this.projetId = projetId;
        this.sectionSubscription = this.observableService
          .getObservableSection()
          .subscribe((response) => {
            this.http
              .get<Project>(
                `http://localhost:8080/projets/projet?id=${this.projetId}`
              )
              .subscribe((projectData: Project) => {
                this.sections = projectData.sections;
                this.projet = projectData;
                this.modeAffichage = this.projet.modeAffichage;
                console.log('hehehehehe');
              });
          });
        this.sections.forEach((section) => {
          console.log(section);
        });
      }
    });

    //On recupere les etats 
    this.route.paramMap.subscribe((param) => {
      const projetId = param.get('projectId');
      console.log(projetId);
      if (projetId != null) {
        this.projetId = projetId;
        this.sectionSubscription = this.observableService
          .getObservableSection()
          .subscribe((response) => {
            this.http.get<string[]>(`http://localhost:8080/projets/getEtatId?id=${this.projetId}`)
              .subscribe((etats: string[]) => {
                this.etats = etats;
              });
          });
          this.etats.forEach((etat) => {
            console.log("etat : ", etat);
          });
      }
    });
  }

  //En affichage Kanban quand on clique sur plus
  onPlusClickSection(event: MouseEvent): void {
    const dialogRef = this.dialog.open(CreateSectionComponent, {
      data: this.projetId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  //En affichage Scrum quand on clique sur plus
  onPlusClickEtat(event: MouseEvent): void {
    const dialogRef = this.dialog.open(CreateEtatComponent, {
      data: this.projetId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.http
      .put(
        `http://localhost:8080/projets/updateSections?id=${this.projetId}&sections=${this.sections}`,
        {}
      )
      .subscribe((response) => {
        this.observableService.notifySection();
      });
  }


  dropEtat(event: CdkDragDrop<string[]>) {
    const v1 = this.etats[event.previousIndex];
    const v2 = this.etats[event.currentIndex];
    let pi: number = this.sections.indexOf(v1);
    let ci: number = this.sections.indexOf(v2);
    moveItemInArray(this.sections, pi, ci);
    this.http
      .put(
        `http://localhost:8080/projets/updateSections?id=${this.projetId}&sections=${this.sections}`,
        {}
      )
      .subscribe((response) => {
        this.observableService.notifySection();
      });
  }

  //On appelle cette fonction à chaque fois que le mode d'affichage est changé
  handleAffichageChange(nouvelAffichage: string): void {   
    /*Je fais comme ca au lieu de juste recup la valeur dans la bdd, parce que j'ai galéré avec le delire
    d'asyncronité et tout (en gros le handle se lancais avant que la bdd ai eu le temps de se mettre à jour)
    mais la du coup ca marche, et malgré tout la valeur est bien mise à jour dans la bdd tkt*/
    this.modeAffichage = nouvelAffichage;
    console.log('Le mode d\'affichage est ', this.modeAffichage);
  }
}
