// tache.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class TacheService {

    private apiUrl = 'http://localhost:8080/taches';
    constructor(private http: HttpClient) {}

    attribuerEquipeATache(tacheId: string, equipeIds: string[]): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${tacheId}/equipe`, equipeIds);
    }

}