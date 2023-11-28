import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';
import { DateLimiteCalendrierComponent } from './date-limite-calendrier/date-limite-calendrier.component';
import { ModifierCollaborateurComponent } from './modifier-collaborateur/modifier-collaborateur.component';

@Component({
  selector: 'app-tache-scrum',
  templateUrl: './tache-scrum.component.html',
  styleUrls: ['./tache-scrum.component.css']
})
export class TacheScrumComponent {
  @Input() id!: String | null;
  @Input() projetId!: String;
  @Input()
  sectionId!: String | null;
  @Input()
  tacheId!: string;
  tache!: Tache | null | undefined;
  membreAttribue!: Utilisateur[];
  mouseX: number = 0;
  mouseY: number = 0;
  showSetting = false;
  taskSubscription!: Subscription;
  
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private observableService: ObservableService,
     private observerService: ObservableService,
    
     private cd: ChangeDetectorRef,
     public dialog: MatDialog) {}

  ngOnInit(){
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

  openDialog(event: MouseEvent): void {
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
        this.observerService.notifyTask();
        this.cd.detectChanges();
      }
    });
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

  openDialogCollaborateurs(event: MouseEvent): void {
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
  
    const dialogRef = this.dialog.open(ModifierCollaborateurComponent, {
      position: { left: `${left}px`, top: `${top}px` },
      data: { projetId: this.projetId,id: this.id, tacheId: this.tacheId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
      this.updateTache();
      this.observerService.notifyTask();
      this.cd.detectChanges();
    });
  }

  updateTache() {
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
