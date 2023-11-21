import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-tache-scrum',
  templateUrl: './tache-scrum.component.html',
  styleUrls: ['./tache-scrum.component.css']
})
export class TacheScrumComponent {
  id: String | null = '';
  @Input() projetId: String = '';
  @Input()
  sectionId: String | null = '';
  @Input()
  tacheId: string = '';
  tache!: Tache | null | undefined;
  membreAttribue!: Utilisateur[];
  mouseX: number = 0;
  mouseY: number = 0;
  showSetting = false;
  taskSubscription!: Subscription;
  
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private observableService: ObservableService,
     private observerService: ObservableService,
    
     private cd: ChangeDetectorRef) {}

  ngOnInit(){
    console.log("tacheId: " + this.tacheId)
    if (this.tacheId) {
      this.taskSubscription = this.observableService
        .getObservableTask()
        .subscribe((response) => {
          this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`).subscribe((response) => {
              this.tache = response;
            });
      });
      this.http.get<Utilisateur[]>(`http://localhost:8080/taches/membreAttribue?id=${this.tacheId}`).subscribe((data: Utilisateur[]) => {
        this.membreAttribue = data;
      })
    }
  }
}
