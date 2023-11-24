import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Section from 'src/interface/Section';
import { SectionService } from '../section/section.service';
import { CreateTaskComponent } from '../../create-task/create-task.component';

@Component({
  selector: 'app-section-scrum',
  templateUrl: './section-scrum.component.html',
  styleUrls: ['./section-scrum.component.css']
})
export class SectionScrumComponent {
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
  tasks!: string[];
  private sectionData = new BehaviorSubject<Section | null>(null);

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

}
