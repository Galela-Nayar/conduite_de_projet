import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Project from 'src/interface/Project';
import { SectionComponent } from './section/section.component';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  id: string = '';
  projetId: string = '';
  projet?: Project;
  @ViewChild('sectionContainer', { read: ViewContainerRef, static:false }) container!: ViewContainerRef;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateSection = false;
  dataLoad = false;
  private projetData = new BehaviorSubject<Project | null>(null);



  constructor(private http: HttpClient, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id != null) this.id = id;
    const projetId = this.route.snapshot.paramMap.get('projectId');
    if(projetId != null){
      this.projetId = projetId;
      this.http.get<Project>(`http://localhost:8080/projets/projet?id=${this.projetId}`)
      .pipe(
        mergeMap((projectData: Project) => {
          this.projet = projectData;  
          console.log('projectDAta\n',projectData);
          console.log("id : " + this.id +"\nprojectId : " + this.projetId + "\nprojet : " + this.projet);
          this.dataLoad = true;
          this.projetData.next(projectData);
          return this.projetData;
        })
      )
      .subscribe(() => {
      });
    }
  }
  
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    this.projetData.subscribe((projectData: Project | null) => {
      if(this.dataLoad) {
        setTimeout(() => {
          this.createSections();
        });
      }
      console.log('data not load');
    });
  }

  createSections() {
    if (this.projet && this.projet.sections) {
      this.projet.sections.forEach(section => {
        console.log('createSections\n');
        console.log('section.id: ', section);
        const componentRef = this.container.createComponent(SectionComponent);
        (componentRef.instance as SectionComponent).sectionId = section;
        (componentRef.instance as SectionComponent).fetchSectionData();
      });
    }
  }

  onPlusClick(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.showCreateSection = true;
    this.cd.detectChanges();
  }
}
