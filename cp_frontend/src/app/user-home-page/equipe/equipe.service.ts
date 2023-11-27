import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from './equipe.model';

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  private apiUrl = 'http://localhost:8080/equipe';

  constructor(private http: HttpClient) {}

  getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.apiUrl);
  }

  getAllEquipes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
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
  
}
