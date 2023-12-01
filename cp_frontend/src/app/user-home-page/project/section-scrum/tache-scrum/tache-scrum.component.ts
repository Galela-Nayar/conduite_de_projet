import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component,ViewChild, ElementRef, Input, AfterViewChecked,  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';
import Notification from 'src/interface/Notification';
import { DateLimiteCalendrierComponent } from './date-limite-calendrier/date-limite-calendrier.component';
import { ModifierCollaborateurComponent } from './modifier-collaborateur/modifier-collaborateur.component';

@Component({
  selector: 'app-tache-scrum',
  templateUrl: './tache-scrum.component.html',
  styleUrls: ['./tache-scrum.component.css']
})
export class TacheScrumComponent implements AfterViewChecked {
  @ViewChild('textareaNom') textareaNom!: ElementRef;
  @ViewChild('textareaPriorite') textareaPriorite!: ElementRef;
  @ViewChild('textareaPonderation') textareaPonderation!: ElementRef;

  @Input() id!: String;
  @Input() projetId!: String;
  @Input()
  sectionId!: String;
  @Input()
  tacheId!: string;
  tache!: Tache | null | undefined;
  membreAttribue!: Utilisateur[];
  mouseX: number = 0;
  mouseY: number = 0;
  showSetting = false;
  taskSubscription!: Subscription;
  isEditingNom = false;
  isEditingPriorite = false;
  isEditingPonderation = false;
  droitUtilisateurActuel: string = '';
  showMiniUserProfil: boolean = false;
  selectedMembre: Utilisateur
  hideTimeout = 1000
  listNotifications!: Notification[]

  
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


    //Les droits de l'utilisateur actuel
    this.http.get(`http://localhost:8080/projets/droitUtilisateur?idUtilisateur=${this.id}&idProjet=${this.projetId}`, {responseType: 'text'}).subscribe((data: string) => {
      this.droitUtilisateurActuel = data;
      console.log("droit dans section: " + this.droitUtilisateurActuel)
});
    }
  }

  ngAfterViewChecked() {
    if (this.textareaNom) {
      this.adjustTextareaNom({ target: this.textareaNom!.nativeElement });
      this.textareaNom.nativeElement.focus();
    }
    if (this.textareaPriorite) {
      this.adjustTextareaPriorite({ target: this.textareaPriorite!.nativeElement });
      this.textareaPriorite.nativeElement.focus();
    }
    if (this.textareaPonderation) {
      this.adjustTextareaPonderation({ target: this.textareaPonderation!.nativeElement });
      this.textareaPonderation.nativeElement.focus();
    }
}
  updateTaskNom() {
    this.http.put(`http://localhost:8080/taches/updateNom?id=${this.id}&projectId=${this.projetId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}&nom=${this.tache.nom}`, {responseType:"text"}).
    subscribe((tacheData) => {
      this.updateTache();
      this.isEditingNom = false;
      this.observerService.notifyTask();
      this.cd.detectChanges()
    })
  }

  updateTaskPriorite() {
    this.http.put(`http://localhost:8080/taches/updatePriorite?id=${this.tacheId}&priorite=${this.tache.priorite}`, {responseType:"text"}).
    subscribe((tacheData) => {
      this.updateTache();
      this.isEditingPriorite = false;
      this.observerService.notifyTask();

      this.cd.detectChanges();

    })
    
  }

  updateTaskPonderation() {
    this.http.put(`http://localhost:8080/taches/updatePonderation?id=${this.tacheId}&ponderation=${this.tache.ponderation}`, {responseType:"text"}).
    subscribe((tacheData) => {
      this.updateTache();
      this.isEditingPonderation = false;
      this.observerService.notifyTask();

      this.cd.detectChanges();

    })
    
  }

  adjustTextareaNom(event?: any) {
    let target = event ? event.target : this.textareaNom.nativeElement;
    target.style.height = 'auto';
    target.style.height = (target.scrollHeight) + 'px';
}

adjustTextareaPriorite(event?: any) {
  let target = event ? event.target : this.textareaPriorite.nativeElement;
  target.style.height = 'auto';
  target.style.height = (target.scrollHeight) + 'px';
}

adjustTextareaPonderation(event?: any) {
  let target = event ? event.target : this.textareaPonderation.nativeElement;
  target.style.height = 'auto';
  target.style.height = (target.scrollHeight) + 'px';
}

editNom(){
  if(this.droitUtilisateurActuel != 'Visiteur') this.isEditingNom = true
}

editPriorite(){
  if(this.droitUtilisateurActuel != 'Visiteur') this.isEditingPriorite = true
}

editPonderation(){
  if(this.droitUtilisateurActuel != 'Visiteur') this.isEditingPonderation = true
}


showMiniUserProfile(membre: any,  event: MouseEvent) {
  this.hideTimeout = setTimeout(() => {
    
    const rect = (event.target as Element).getBoundingClientRect();
    this.mouseX = rect.left;
    this.mouseY = rect.bottom;
    this.selectedMembre = membre;
    this.showMiniUserProfil = true;
  }, 700); // adjust the delay as needed
}

hideMiniUserProfile() {
  this.hideTimeout = setTimeout(() => {
    this.showMiniUserProfil = false;
  }, 150); // adjust the delay as needed
}

cancelHideMiniUserProfile() {
  clearTimeout(this.hideTimeout);
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
        this.cd.detectChanges();
        this.observerService.notifyTask();
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
      this.cd.detectChanges();
      this.observerService.notifyTask();
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

