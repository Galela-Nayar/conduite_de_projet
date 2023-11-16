import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../../section.service';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import { ModifyTaskComponent } from './modify-task/modify-task.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tache-setting',
  templateUrl: './tache-setting.component.html',
  styleUrls: ['./tache-setting.component.css']
})
export class TacheSettingComponent {
  @Input() tacheId!: String;
  @Input() sectionId: String | null = '';
  @Input() projetId!: String;

  constructor(private http: HttpClient, private sectionService: SectionService, 
    private route: ActivatedRoute, private observableService: ObservableService,
    public dialog: MatDialog) {}


  supprimer(){
    this.http.get(`http://localhost:8080/taches/removeTache?id=${this.tacheId}`,{responseType: 'text'}).subscribe((response:String)=>{
      console.log("supprimer tache : " + response)
      this.http.get(`http://localhost:8080/sections/removeTache?id=${this.sectionId}&tacheId=${this.tacheId}`,{responseType: 'text'}).subscribe((response2: String)=>{
        console.log("supprimer tache dans section: " + response)
        this.observableService.notifyTask();
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
  
}
