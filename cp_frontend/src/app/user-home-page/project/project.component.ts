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
              });
          });
      }
    });
  }

  onPlusClick(event: MouseEvent): void {
    const dialogRef = this.dialog.open(CreateSectionComponent, {
      data: this.projetId,
    });

    dialogRef.afterClosed().subscribe((result) => {
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
}
