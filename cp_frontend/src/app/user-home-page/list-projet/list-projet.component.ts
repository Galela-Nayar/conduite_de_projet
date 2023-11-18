import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Project from 'src/interface/Project';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css'],
})
export class ListProjetComponent implements OnInit {
  id: string = '';
  projects_id: any[] = [];
  projets: Project[] = [];
  projectSubscription!: Subscription;

  constructor(
    private projetService: ObservableService,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id !== null && id != undefined) {
      this.id = id;
      this.projectSubscription = this.projetService
        .getObservableProjet()
        .subscribe((response) => {
          this.http
            .get<any[]>(
              `http://localhost:8080/utilisateurs/projects?id=${this.id}`
            )
            .subscribe((projects_id) => {
              console.log(projects_id);
              if (projects_id != null) this.projects_id = projects_id;
              this.projects_id.forEach((project) => {
                this.http
                  .get<Project>(
                    `http://localhost:8080/projets/projet?id=${project}`
                  )
                  .subscribe((projectData: Project) => {
                    if (projectData != null) {
                      this.projets.push(projectData);
                    }
                    console.log(projectData);
                  });
              });
            });
        });
    }
  }
}
