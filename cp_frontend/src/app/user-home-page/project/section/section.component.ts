import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Section from 'src/interface/Section';
import { BehaviorSubject, Subscription, mergeMap} from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent{
  id: String | null = '';
  projetId: String | null = '';
  @Input()
  sectionId: String = '';
  section?: Section;
  mouseX: number = 0;
  mouseY: number = 0;
  showCreateTask = false;
  showSetting = false;
  taskSubscription!: Subscription;
  tasks: any[]=[];
  private sectionData = new BehaviorSubject<Section | null>(null);

  constructor(private http: HttpClient,private cd: ChangeDetectorRef, private route: ActivatedRoute, private observableService: ObservableService) {}

  ngOnInit(){
    this.id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    this.projetId = this.route.parent ? this.route.parent.snapshot.paramMap.get('projetId') : null;
    if (this.sectionId) {
      this.sectionId = this.sectionId;
      this.taskSubscription = this.observableService.getObservableTask().subscribe((response)=>{
        this.http.get<Section>(`http://localhost:8080/sections/section?id=${this.sectionId}`).subscribe((response)=>{
          this.section = response;  
          this.tasks=this.section.taches;
        })
      });
    }
  }

  onPlusClick(event: MouseEvent): void {
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
