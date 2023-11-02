import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Project from 'src/interface/Project';



@Component({
  selector: 'app-lateral-user-home-menu',
  templateUrl: './lateral-user-home-menu.component.html',
  styleUrls: ['./lateral-user-home-menu.component.css']
})
export class LateralUserHomeMenuComponent implements OnInit {
  id: string = '';
  projects_id: any[] = [];
  projet: Project[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.http.get<any[]>(`http://localhost:8080/utilisateurs/projects?id=${this.id}`).subscribe((projects_id) => {
      
      console.log(projects_id);  
      if(projects_id != null)
        this.projects_id = projects_id;
        this.projects_id.forEach(project => {
        this.http.get<Project>(`http://localhost:8080/projets/projet?id=${project}`)
        .subscribe((projectData: Project) => {
          if(projectData != null){
            if(!this.checkProject(projectData)){
              this.projet.push(projectData);
            }
          }
          console.log(projectData);
              });
        });
      });
    }
  }

  checkProject(pj: Project){
    let bl = false;
    this.projet.forEach(p => {
      if(pj.id == p.id) bl = true;
    });
    return bl;
  }
}
