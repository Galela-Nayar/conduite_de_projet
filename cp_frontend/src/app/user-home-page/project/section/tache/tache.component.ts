import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css'],
})
export class TacheComponent {
  id: String | null = '';
  @Input() projetId: String = '';
  @Input()
  sectionId: String | null = '';
  @Input()
  tacheId: string = '';
  tache!: Tache | null | undefined;
  mouseX: number = 0;
  mouseY: number = 0;
  showSetting = false;
  taskSubscription!: Subscription;
  dateLimite!: Date;
  membreAttribue!: any[]

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    private observerService: ObservableService,

    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('tacheId: ' + this.tacheId);
    if (this.tacheId) {
      this.taskSubscription = this.observableService
        .getObservableTask()
        .subscribe((response) => {
          this.http
            .get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
            .subscribe((response) => {
              this.tache = response;
              this.dateLimite = new Date(this.tache.dateLimite);
              // Formater la date selon le modèle "JJ-MM-AA"
              const formattedDate = this.dateLimite.toLocaleDateString(
                'fr-FR',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }
              );
              this.http
              .get<Utilisateur[]>(
                `http://localhost:8080/taches/membreAttribue?id=${this.tacheId}`
              )
              .subscribe((data: Utilisateur[]) => {
                this.membreAttribue = data;
              });
              // Mettre à jour la dateLimite avec la date formatée
              this.dateLimite = new Date(formattedDate);
            });
        });
    }
  }

  swapStatut(){
    this.http.get(`http://localhost:8080/taches/swapStatut?id=${this.tacheId}`, {responseType:"text"}).
    subscribe((tacheData) => {
      if(this.tache?.statutTerminer) this.tache.statutTerminer = false;
      if(this.tache?.statutTerminer == false) this.tache.statutTerminer = true;
      this.observerService.notifyTask();
      this.cd.detectChanges();
    });
  }

  onSettingClick(event: MouseEvent) {
    this.cd.detectChanges();
  }
}
