import { Injectable } from '@angular/core';
import { Observable, switchMap, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Project from 'src/interface/Project';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  private projectSubject$ = new BehaviorSubject<any>('init projet');
  private section$ = new BehaviorSubject<string>('init section');
  private task$ = new BehaviorSubject<string>('init task');

  constructor(private http: HttpClient) {}

  getObservableProjet(): Observable<string> {
    return this.projectSubject$.asObservable();
  }

  getObservableSection(): Observable<string> {
    return this.section$.asObservable();
  }

  getObservableTask(): Observable<string> {
    return this.task$.asObservable();
  }

  notifyProject() {
    this.projectSubject$.next('updated');
  }

  notifySection() {
    this.section$.next('updated');
  }

  notifyTask() {
    this.task$.next('updated');
  }

  sendProjet(projet: Project[]) {
    this.projectSubject$.next(projet);
  }
}
