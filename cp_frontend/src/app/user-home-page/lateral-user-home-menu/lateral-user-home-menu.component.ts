import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefreshService } from 'src/service/RefreshService';

@Component({
  selector: 'app-lateral-user-home-menu',
  templateUrl: './lateral-user-home-menu.component.html',
  styleUrls: ['./lateral-user-home-menu.component.css']
})
export class LateralUserHomeMenuComponent implements OnInit {
  id: string = '';
  projects: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private refreshService: RefreshService) {
    refreshService.refreshAnnounced$.subscribe(() => {
      this.refreshComponent();
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id){
        this.id = id;
        if(this.projects.length == 0) {
          this.getProjects();
        }
      }
    });
  }

  refreshComponent() {
    console.log('menu refresh');
    this.getProjects();
  }

  getProjects(){
    this.http.get<any[]>(`http://localhost:8080/utilisateurs/projects?id=${this.id}`).subscribe((projects) => {
    
    console.log(projects);  
    if(projects != null)
          this.projects = projects;
      }
    );
  }
}