import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Project from 'src/interface/Project';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  id: string = '';
  projetId: string = '';
  projet!: Project;
  @ViewChild('sectionContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private http: HttpClient, private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id != null) this.id = id;
    const projetId = this.route.snapshot.paramMap.get('projectId');
    if(projetId != null){
      this.projetId = projetId;
      this.http.get<Project>(`http://localhost:8080/projets/projet?id=${this.projetId}`)
      .subscribe((projectData: Project) => {
        this.projet = projectData;  
        console.log(projectData);
        console.log("id : " + this.id +"\nprojectId : " + this.projetId + "\nprojet : " + this.projet);
      });
      this.projet?.sections.forEach(section => {
        const factory = this.componentFactoryResolver.resolveComponentFactory(SectionComponent);
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.id = section.id;
      });
    }
  }
}
