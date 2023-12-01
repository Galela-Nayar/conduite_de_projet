import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../../section.service';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import { ModifyTaskComponent } from './modify-task/modify-task.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModifierCollaborateurComponent } from '../../../section-scrum/tache-scrum/modifier-collaborateur/modifier-collaborateur.component';
import { EtiquetteTachesComponent } from 'src/app/user-home-page/etiquette-settings/etiquette-taches/etiquette-taches.component';


@Component({
  selector: 'app-tache-setting',
  templateUrl: './tache-setting.component.html',
  styleUrls: ['./tache-setting.component.css']
})
export class TacheSettingComponent {
  id!: String
  tacheId!: String;
  sectionId: String | null = '';
  projetId!: String;

  constructor(private http: HttpClient, private sectionService: SectionService, 
    private route: ActivatedRoute, private observableService: ObservableService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModifierCollaborateurComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { projetId: String,id: String, tacheId: String , sectionId: String}
   ) {
       this.projetId = data.projetId;
       this.id = data.id;
       this.tacheId = data.tacheId;
       this.sectionId = data.sectionId
   }


  supprimer(){
    this.http.get(`http://localhost:8080/taches/removeTache?id=${this.tacheId}`,{responseType: 'text'}).subscribe((response:String)=>{
      console.log("supprimer tache : " + response)
      this.http.get(`http://localhost:8080/sections/removeTache?id=${this.sectionId}&tacheId=${this.tacheId}`,{responseType: 'text'}).subscribe((response2: String)=>{
        console.log("supprimer tache dans section: " + response)
        this.observableService.notifyTask();
        this.dialogRef.close()
      })
    })
  }

  modifier(){
    console.log("projectID data : " + this.projetId)
    const dialogRef = this.dialog.open(ModifyTaskComponent, {
      data: {data1:this.tacheId,data2:this.projetId},
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Le dialogue a été fermé');
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
      data: { projetId: this.projetId,id: this.id, tacheId: this.tacheId, sectionId: this.sectionId }
    });
  }

  openDialogEtiquette(event: MouseEvent): void {
    console.log("projectID data : " + this.projetId)
    const dialogRef = this.dialog.open(EtiquetteTachesComponent, {
      data: {data1:this.tacheId,data2:this.projetId},
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Le dialogue a été fermé');
    });
  }
  
}
