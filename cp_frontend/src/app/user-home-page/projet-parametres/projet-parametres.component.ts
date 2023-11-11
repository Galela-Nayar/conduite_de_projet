import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/interface/Project';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-projet-parametres',
  templateUrl: './projet-parametres.component.html',
  styleUrls: ['./projet-parametres.component.css']
})
export class ProjetParametresComponent {

  projectId!: string | null | undefined;

  project!: Project;
  createur!:Utilisateur;
  fields: { key: string, label: string, value: string, saved: boolean }[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    console.log("projectId : " + this.projectId)
    this.http.get<Project>(`http://localhost:8080/projets/projet?id=${this.projectId}`).subscribe((data: Project) => {
      this.project = data;
      this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.project.createur}`).subscribe((data: Utilisateur) => {
        this.createur = data;
      });
    });
    this.fields = [
      { key: 'nom', label: 'Nom du projet', value: '', saved: false },
    ];
  }

  getUserProperty(key: string): any {
    return this.project[key];
  }

  save(field: { key: any; value: any; saved: boolean; }): void {
    console.log(`http://localhost:8080/projets/set_${field.key}?id=${this.projectId}&param=${field.value}`)
    this.http.get(`http://localhost:8080/projets/set_${field.key}?id=${this.projectId}&param=${field.value}`, {responseType: 'text'}).subscribe((data: string) => {
      if (data.toString().startsWith('ok')) {
        field.saved = true;
      }
    });
  }

  getFormattedDate(date: string | Date): string {
    date = new Date(date);
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
}
