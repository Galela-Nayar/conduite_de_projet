import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-modifier-collaborateur',
  templateUrl: './modifier-collaborateur.component.html',
  styleUrls: ['./modifier-collaborateur.component.css']
})
export class ModifierCollaborateurComponent {
  tacheId!: String
  id!: String
  projetId!: String
  sectionId!: String
  tache!: Tache
  liste1: Utilisateur[]
  liste2: Utilisateur[]
  taskSubscription!: Subscription;
  showSetting = false;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private observableService: ObservableService,
     private observerService: ObservableService,
    
     private cd: ChangeDetectorRef,
     public dialog: MatDialog,
     public dialogRef: MatDialogRef<ModifierCollaborateurComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {sectionId: String, projetId: String,id: String, tacheId: String }
    ) {
        this.sectionId = data.sectionId
        this.projetId = data.projetId;
        this.id = data.id;
        this.tacheId = data.tacheId;
    }

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
        this.liste1 = data;
      })
      this.http.get<Utilisateur[]>(`http://localhost:8080/taches/membreRestant?id=${this.tacheId}&projectId=${this.projetId}`).subscribe((data: Utilisateur[]) => {
        this.liste2 = data;
      })
    }
  }

  removeFromList1(membre: Utilisateur) {
    
    this.http.get(`http://localhost:8080/taches/remove_collaborateur?id=${this.id}&projectId=${this.projetId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}&collaborateurId=${membre.id}`, {responseType:'text'}).subscribe((data: String) => {
    
      const index = this.liste1.indexOf(membre);
      if (index > -1) {
          this.liste1.splice(index, 1);
          this.liste2.push(membre);
      }

      this.observerService.notifyTask();  
      this.cd.detectChanges()
    })

}

addToList1(membre: Utilisateur) {
  this.http.get(`http://localhost:8080/taches/add_collaborateur?id=${this.id}&projectId=${this.projetId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}&collaborateurId=${membre.id}`, {responseType:'text'}).subscribe((data: String) => {
    
    const index = this.liste2.indexOf(membre);
    if (index > -1) {
        this.liste2.splice(index, 1);
        this.liste1.push(membre);
    }
    this.observerService.notifyTask();
    this.cd.detectChanges()
  })
}

  close(){
    this.observerService.notifyTask();
    this.cd.detectChanges()
    this.dialogRef.close()
  }
}
