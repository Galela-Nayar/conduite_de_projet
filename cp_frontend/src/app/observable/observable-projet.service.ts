import { Injectable } from '@angular/core';
import { Observable, switchMap, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  private projectSubject$ = new BehaviorSubject<string>("init projet");
  private section$ = new BehaviorSubject<string>("init section");
  private task$ = new BehaviorSubject<string>("init task");

  constructor(private http: HttpClient) { }

  getObservableProjet(): Observable<string>{
    return this.projectSubject$.asObservable();
  }

  getObservableSection(): Observable<string>{
    return this.section$.asObservable();
  }

  getObservableTask(): Observable<string>{
    return this.task$.asObservable();
  }

  notifyProject() {
    this.projectSubject$.next("updated");
  }

  notifySection(){
    this.section$.next("updated");
  }

  notifyTask(){
    this.task$.next("updated");
  }
}
