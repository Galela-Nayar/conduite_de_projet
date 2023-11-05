// section.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private sectionIdSource = new BehaviorSubject<String | null>(null);
  currentSectionId = this.sectionIdSource.asObservable();

  constructor() { }

  changeSectionId(sectionId: String) {
    this.sectionIdSource.next(sectionId);
  }
}