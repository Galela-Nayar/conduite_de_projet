import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Section from 'src/interface/Section';
import { SectionService } from '../section/section.service';
import { CreateTaskComponent } from '../../create-task/create-task.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section-scrum',
  templateUrl: './section-scrum.component.html',
  styleUrls: ['./section-scrum.component.css']
})
export class SectionScrumComponent implements AfterViewChecked{
  @ViewChild('textareaNom') textareaNom!: ElementRef;
  @Input() id!: String | null;
  @Input() projetId!: String;
  @Input() sectionId: String;
  section!: Section;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateTask = false;
  showSetting = false;
  taskSubscription!: Subscription;
  isEditingNom = false;
  tasks!: string[];
  private sectionData = new BehaviorSubject<Section | null>(null);
  droitUtilisateurActuel: string = '';

  constructor(
    private http: HttpClient,
    private sectionService: SectionService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    private observerService: ObservableService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
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
        //Les droits de l'utilisateur actuel
        this.http.get(`http://localhost:8080/projets/droitUtilisateur?idUtilisateur=${this.id}&idProjet=${this.projetId}`, {responseType: 'text'}).subscribe((data: string) => {
              this.droitUtilisateurActuel = data;
        });
    }
  }

  ngAfterViewChecked() {
    if (this.textareaNom) {
      this.adjustTextareaNom({ target: this.textareaNom!.nativeElement });
      this.textareaNom.nativeElement.focus();
    }
  }

  adjustTextareaNom(event?: any) {
    let target = event ? event.target : this.textareaNom.nativeElement;
    target.style.height = 'auto';
    target.style.height = (target.scrollHeight) + 'px';
}

  updateTaskNom() {
    this.http.put(`http://localhost:8080/sections/updateNom?id=${this.sectionId}&nom=${this.section.nom}`, {responseType:"text"}).
    subscribe((tacheData) => {
      this.updateSection();
      this.isEditingNom = false;
      this.observerService.notifyTask();
      this.cd.detectChanges()
    })
  }

  updateSection() {
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
  
editNom(){
  if(this.droitUtilisateurActuel != 'Visiteur') this.isEditingNom = true
}

  onPlusClick(event: MouseEvent): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: {id: this.id, projectId: this.projetId, sectionId: this.sectionId}
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
