import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { ObservableService } from 'src/app/observable/observable-projet.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  id: string = ''
  project = {
    nom: '',
    createur: '',
    date: new Date(),
    standardSection: true,
    description: "",
    dateButoire: new Date(),
    modeAffichage: 'Kanban'
  };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private projectService: ObservableService) {} // Inject Router
  
  submitForm() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id != null) {
      this.id = id;
      this.project.createur = id;
    }
    this.project.date = new Date(this.project.date);
    this.project.dateButoire = new Date(this.project.dateButoire);
    const headers = { 'Content-Type': 'application/json' };

    this.http.post('http://localhost:8080/projets/create', this.project, {responseType: 'text'}).subscribe(
      (response) => {
        console.log(response);
        this.http.get(`http://localhost:8080/utilisateurs/add-projet?userId=${this.project.createur}&projetId=${response}`, {responseType: 'text'}).subscribe(
          (reponse)=>{
          console.log('C\'est bon, ', reponse);
          this.projectService.notifyProject();
          this.router.navigate([`/${this.id}/home`]);
        })
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
      }
    );
    
  }
}
