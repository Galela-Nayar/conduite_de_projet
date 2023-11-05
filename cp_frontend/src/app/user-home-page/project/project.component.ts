import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Project from 'src/interface/Project';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ObservableService } from 'src/app/observable/observable-projet.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnDestroy{
  id: string = '';
  projetId: string = '';
  projet?: Project;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateSection = false;
  dataLoad = false;
  sections: any[] = [];
  sectionSubscription!: Subscription;



  constructor(private http: HttpClient, private route: ActivatedRoute, private cd: ChangeDetectorRef, private observableService: ObservableService) {}
  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id != null) this.id = id;
    const projetId = this.route.snapshot.paramMap.get('projectId');
    if(projetId != null){
      this.projetId = projetId;
      this.sectionSubscription = this.observableService.getObservableSection().subscribe((response)=>{
        this.http.get<Project>(`http://localhost:8080/projets/projet?id=${this.projetId}`).subscribe((projectData: Project)=>{
          this.sections=projectData.sections;
        });
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
