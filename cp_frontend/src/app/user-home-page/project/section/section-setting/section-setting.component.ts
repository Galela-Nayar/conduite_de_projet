import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import { ModifySectionComponent } from './modify-section/modify-section.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from 'src/app/user-home-page/create-task/create-task.component';

@Component({
  selector: 'app-section-setting',
  templateUrl: './section-setting.component.html',
  styleUrls: ['./section-setting.component.css']
})
export class SectionSettingComponent implements OnInit{
  @Input() sectionId!: String;
  @Input() mouseX!: number;
  @Input() mouseY!: number;
  contextMenuStyle = {};
  id: string = '';
  projectId: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, 
    private observableService: ObservableService, public dialog: MatDialog) {}

  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id) this.id = id;
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if(projectId) this.projectId = projectId;
    const sectionId = this.route.snapshot.paramMap.get('sectionId');
    if(sectionId) this.sectionId = sectionId;
    

  }
  
  supprimer(){
    this.http.get(`http://localhost:8080/sections/removeSection?id=${this.sectionId}`,{responseType: 'text'}).subscribe((response:String)=>{
      console.log("supprimer section : " + response)
      this.http.get(`http://localhost:8080/projets/removeSection?id=${this.projectId}&sectionId=${this.sectionId}`,{responseType: 'text'}).subscribe((response2: String)=>{
        console.log("supprimer section dans projet: " + response)
        this.observableService.notifySection();
      })
    })
  }

  ajouterTache(){
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: this.sectionId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  modifier(){
    const dialogRef = this.dialog.open(ModifySectionComponent, {
      data: this.sectionId,
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Le dialogue a été fermé');
    });
  }
}

