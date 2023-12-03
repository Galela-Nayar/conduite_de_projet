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
  CdkDropListGroup,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

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
  sectionSubscription!: Subscription;
  modeAffichage: String = '';
  droitUtilisateurActuel: string = '';

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
              });
          });
        this.sections.forEach((section) => {
          console.log(section);
        });
      }
    });

    //Les droits de l'utilisateur actuel
    this.http.get(`http://localhost:8080/projets/droitUtilisateur?idUtilisateur=${this.id}&idProjet=${this.projetId}`, {responseType: 'text'}).subscribe((data: string) => {
          this.droitUtilisateurActuel = data;
          console.log("droit dans projet : " + this.droitUtilisateurActuel)
    });
  }

  onPlusClickSection(event: MouseEvent): void {
    const dialogRef = this.dialog.open(CreateSectionComponent, {
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


  //On appelle cette fonction à chaque fois que le mode d'affichage est changé
  handleAffichageChange(nouvelAffichage: string): void {   
    /*Je fais comme ca au lieu de juste recup la valeur dans la bdd, parce que j'ai galéré avec le delire
    d'asyncronité et tout (en gros le handle se lancais avant que la bdd ai eu le temps de se mettre à jour)
    mais la du coup ca marche, et malgré tout la valeur est bien mise à jour dans la bdd tkt*/
    this.modeAffichage = nouvelAffichage;
    console.log('Le mode d\'affichage est ', this.modeAffichage);
  }

  getFormattedDate(date: string | Date): string {
    date = new Date(date);
    return `${date.getDate()}/${this.getFormattedMonth(date)}/${date.getFullYear()}`;
  }

  getFormattedMonth(date: string | Date): string {
    date = new Date(date);
    
    const monthDict = {
      'Jan': 1,
      'Feb': 2,
      'Mar': 3,
      'Apr': 4,
      'May': 5,
      'Jun': 6,
      'Jul': 7,
      'Aug': 8,
      'Sep': 9,
      'Oct': 10,
      'Nov': 11,
      'Dec': 12
    };

    type MonthKey = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
    let month: MonthKey = date.toString().split(' ')[1] as MonthKey;
    return `${monthDict[month]}`;
  }
}
