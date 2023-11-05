import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Section from 'src/interface/Section';
import { TacheComponent } from './tache/tache.component';
import { BehaviorSubject, mergeMap } from 'rxjs';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  id: String | null = '';
  projetId: String | null = '';
  @Input()
  sectionId: String = '';
  section?: Section;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateTask = false;
  showSetting = false;
  @ViewChild('taskContainer', { read: ViewContainerRef, static:false }) container!: ViewContainerRef;
  private sectionData = new BehaviorSubject<Section | null>(null);


  constructor(private http: HttpClient,private cd: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit(){
    this.id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    this.projetId = this.route.parent ? this.route.parent.snapshot.paramMap.get('projetId') : null;
    if (this.sectionId) {
      this.http.get<Section>(`http://localhost:8080/sections/section?id=${this.sectionId}`).pipe(
        mergeMap((sectionData: Section) => {
          this.section = sectionData;  
          console.log('sectionId : ',this.sectionId,'\nsection : ',sectionData);
          this.sectionData.next(sectionData)
          return this.sectionData;
        })
      )
      .subscribe(() => {

        this.createTaches();
      });
    }
  }

  createTaches() {
    if (this.section && this.section.taches) {
      this.section.taches.forEach(tache => {
        console.log('createTaches\n');
        console.log('tache.id: ', tache);
        const componentRef = this.container.createComponent(TacheComponent);
        (componentRef.instance as TacheComponent).tacheId = tache;
        (componentRef.instance as TacheComponent).fetchTacheData();
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

  onPlusClick(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.showCreateTask = true;
    this.cd.detectChanges();
  }
  onSettingClick(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.showSetting = true;
    this.cd.detectChanges();
  }
}
