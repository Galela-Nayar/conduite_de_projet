import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Section from 'src/interface/Section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input()
  sectionId: String = '';
  section?: Section;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(){
    if (this.sectionId) {
      this.http.get<Section>(`http://localhost:8080/sections/section?id=${this.sectionId}`)
        .subscribe((sectionData: Section) => {
          this.section = sectionData;  
          console.log('sectionId : ',this.sectionId,'\nsection : ',sectionData);
        });
    }
  }

  fetchSectionData() {
    if (this.sectionId) {
      this.http.get<Section>(`http://localhost:8080/sections/section?id=${this.sectionId}`)
        .subscribe((sectionData: Section) => {
          this.section = sectionData;  
          console.log('sectionId : ',this.sectionId,'\nsection : ',sectionData);
        });
    }
  }
}
