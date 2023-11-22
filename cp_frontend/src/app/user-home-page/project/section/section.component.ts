import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Section from 'src/interface/Section';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import { SectionService } from './section.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../create-task/create-task.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent {
  id: String | null = '';
  @Input()
  projetId: String = '';
  @Input() sectionId: String = '';
  section?: Section;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateTask = false;
  showSetting = false;
  taskSubscription!: Subscription;
  tasks: any[] = [];
  private sectionData = new BehaviorSubject<Section | null>(null);
  droitUtilisateurActuel: string = '';

  constructor(
    private http: HttpClient,
    private sectionService: SectionService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.parent
      ? this.route.parent.snapshot.paramMap.get('id')
      : null;

    this.route.paramMap.subscribe((param) => {
      const projetId = param.get('projectId');
      console.log(projetId);
      if (projetId != null) {
        this.projetId = projetId;
      }
    });

    if (this.sectionId) {
      this.sectionService.changeSectionId(this.sectionId);
      this.sectionId = this.sectionId;
      this.taskSubscription = this.observableService
        .getObservableTask()
        .subscribe((response) => {
          this.http
            .get<Section>(
              `http://localhost:8080/sections/section?id=${this.sectionId}`
            )
            .subscribe((response) => {
              this.section = response;
              this.tasks = this.section.taches;
            });
        });
    }
    //Les droits de l'utilisateur actuel
    this.http.get(`http://localhost:8080/projets/droitUtilisateur?idUtilisateur=${this.id}&idProjet=${this.projetId}`, {responseType: 'text'}).subscribe((data: string) => {
          this.droitUtilisateurActuel = data;
    });
  }

  onPlusClick(event: MouseEvent): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: this.sectionId,
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  onSettingClick(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.showSetting = true;
    this.cd.detectChanges();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.http
      .put(
        `http://localhost:8080/sections/updateTaches?id=${this.sectionId}&taches=${this.tasks}`,
        {}
      )
      .subscribe((response) => {
        this.observableService.notifySection();
      });
  }
}
