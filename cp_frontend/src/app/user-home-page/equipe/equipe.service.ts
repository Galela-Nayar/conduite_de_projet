import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from './equipe.model';
import Project from 'src/interface/Project';
import Tache from 'src/interface/Tache';

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  private apiUrl = 'http://localhost:8080/equipe';
  private apiUrlProjet = 'http://localhost:8080/projets';


  constructor(private http: HttpClient) {}

  getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.apiUrl);
  }

  getAllEquipes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Projet
  getProjets(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrlProjet);
  }

  getAllProjets(): Observable<any> {
    return this.http.get<any>(this.apiUrlProjet);
  }


  createEquipe(equipe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, equipe);
  }

  addCollaborateur(equipeId: string, collaborateurEmail: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${equipeId}/addCollaborateur?collaborateurEmail=${collaborateurEmail}`, {});
  }

  removeCollaborateur(equipeId: string, collaborateurEmail: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${equipeId}/removeCollaborateur?collaborateurEmail=${collaborateurEmail}`, {});
  }
  
  deleteEquipe(equipeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${equipeId}`);
  }
  


  getAllProjectNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrlProjet}/project-names`);
  }

  getProjectTaches(id: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/project/${id}/taches`);
  }

  assignTacheToEquipe(tacheId: string, equipeId: string): Observable<any> {
    return this.http.put(`${this.apiUrlProjet}/tache/${tacheId}/equipe`, { equipeId });
  }


}
