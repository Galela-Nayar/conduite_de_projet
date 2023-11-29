import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';
import { ModifierCollaborateurComponent } from '../../section-scrum/tache-scrum/modifier-collaborateur/modifier-collaborateur.component';
import { TacheSettingComponent } from './tache-setting/tache-setting.component';
import { DateLimiteCalendrierComponent } from '../../section-scrum/tache-scrum/date-limite-calendrier/date-limite-calendrier.component';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css'],
})
export class TacheComponent  implements AfterViewChecked {
  @ViewChild('textareaNom') textareaNom!: ElementRef;
  @Input() id: String | null = '';
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
  droitUtilisateurActuel: string = '';
  isEditingNom = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    private observerService: ObservableService,

    private cd: ChangeDetectorRef,
    public dialog: MatDialog) {}

  ngOnInit() {
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


    //Les droits de l'utilisateur actuel
    this.http.get(`http://localhost:8080/projets/droitUtilisateur?idUtilisateur=${this.id}&idProjet=${this.projetId}`, {responseType: 'text'}).subscribe((data: string) => {
          this.droitUtilisateurActuel = data;
          console.log("droit dans section: " + this.droitUtilisateurActuel)
    });
  }

  ngAfterViewChecked() {
    if (this.textareaNom) {
      this.adjustTextareaNom({ target: this.textareaNom!.nativeElement });
      this.textareaNom.nativeElement.focus();
    }
  }

  adjustTextareaNom(event?: any) {
    let target = event ? event.target : this.textareaNom.nativeElement;
    target.style.height = 'auto';
    target.style.height = (target.scrollHeight) + 'px';
}

openDialogSetting(event: MouseEvent): void {
  const dialogWidth = 300; // Replace with the width of your dialog
  const dialogHeight = 200; // Replace with the height of your dialog
  let left = event.clientX;
  let top = event.clientY;

  if (left + dialogWidth > window.innerWidth) {
    left = window.innerWidth - dialogWidth;
  }

  if (top + dialogHeight > window.innerHeight) {
    top = window.innerHeight - dialogHeight;
  }

  const dialogRef = this.dialog.open(TacheSettingComponent, {
    position: { left: `${left}px`, top: `${top}px` },
    data: { projetId: this.projetId,id: this.id, tacheId: this.tacheId, sectionId: this.sectionId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
    }
    this.updateTache();
    this.cd.detectChanges();
    this.observerService.notifyTask();
  });
}

openDialogDate(event: MouseEvent): void {
  const dialogWidth = 300; // Replace with the width of your dialog
  const dialogHeight = 200; // Replace with the height of your dialog
  let left = event.clientX;
  let top = event.clientY;

  if (left + dialogWidth > window.innerWidth) {
    left = window.innerWidth - dialogWidth;
  }

  if (top + dialogHeight > window.innerHeight) {
    top = window.innerHeight - dialogHeight;
  }

  const dialogRef = this.dialog.open(DateLimiteCalendrierComponent, {
    position: { left: `${left}px`, top: `${top}px` },
    data: { date: this.tache?.dateLimite || new Date(), tacheId: this.tacheId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.updateTache();
      this.cd.detectChanges();
      this.observerService.notifyTask();
    }
  });
}

updateTaskNom() {
  this.http.put(`http://localhost:8080/taches/updateNom?id=${this.tacheId}&nom=${this.tache.nom}`, {responseType:"text"}).
  subscribe((tacheData) => {
    this.updateTache();
    this.isEditingNom = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  })
}

editNom(){
  if(this.droitUtilisateurActuel != 'Visiteur') this.isEditingNom = true
  this.isEditingNom = false
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
  updateTache(){
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
