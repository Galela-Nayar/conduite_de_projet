import { Injectable } from '@angular/core';
import { Observable, switchMap, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  private projectSubject$ = new BehaviorSubject<string>("init projet");
  private section$ = new BehaviorSubject<string>("init section");

  constructor(private http: HttpClient) { }

  getObservableProjet(): Observable<string>{
    return this.projectSubject$.asObservable();
  }

  getObservableSection(): Observable<string>{
    return this.section$.asObservable();
  }

  notifySection(){
    this.section$.next("updated");
  }

  notifyProject() {
    this.projectSubject$.next("updated");
  }
}
