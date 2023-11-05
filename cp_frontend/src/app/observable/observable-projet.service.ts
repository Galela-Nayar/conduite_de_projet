import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObservableProjetService {
  private projectSubject = new BehaviorSubject<any[]>([]);
  data$: any;

  constructor(private http: HttpClient) { }

  retourneProjects(id: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/utilisateurs/projects?id=${id}`)
      .pipe(
        switchMap((projects) => {
          this.projectSubject.next(projects);
          return this.projectSubject.asObservable();
        })
      );
  }

  updateData(newData: any[]) {
    this.projectSubject.next(newData);
  }
}
