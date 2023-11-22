import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';


@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent {
  id: String | null = '';
  @Input() projetId: String = '';
  @Input()
  sectionId: String | null = '';
  @Input()
  tacheId: string = '';
  tache!: Tache;
  mouseX: number = 0;
  mouseY: number = 0;
  showSetting = false;
  taskSubscription!: Subscription;
  droitUtilisateurActuel: string = '';
  

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
    }

    this.route.paramMap.subscribe((param) => {
      const projetId = param.get('projectId');
      console.log(projetId);
      if (projetId != null) {
        this.projetId = projetId;
      }
    });

    this.id = this.route.parent
      ? this.route.parent.snapshot.paramMap.get('id')
      : null;

    //Les droits de l'utilisateur actuel
    this.http.get(`http://localhost:8080/projets/droitUtilisateur?idUtilisateur=${this.id}&idProjet=${this.projetId}`, {responseType: 'text'}).subscribe((data: string) => {
          this.droitUtilisateurActuel = data;
          console.log("droit dans section: " + this.droitUtilisateurActuel)
    });
  }

  swapStatut(){
    this.http.get(`http://localhost:8080/taches/swapStatut?id=${this.tacheId}`, {responseType:"text"}).
    subscribe((tacheData) => {
      if(this.tache.statutTerminer) this.tache.statutTerminer = false
      else this.tache.statutTerminer = true
      this.observerService.notifyTask();
      this.cd.detectChanges();
    });
  }

  onSettingClick(event: MouseEvent) {
    this.cd.detectChanges();
  }
}
