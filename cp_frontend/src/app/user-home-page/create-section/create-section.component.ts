import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent {
  id: string = '';
  projectId: string = '';
  nom: string = '';
  showContextMenu = true;
  contextMenuStyle = {};
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
    private observableService: ObservableService,
    public dialogRef: MatDialogRef<CreateSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.projectId = this.data;
  }



  onButtonClick() {
    this.http.get(`http://localhost:8080/sections/create?name=${this.nom}`, {responseType: 'text'}).subscribe(
      (sectionId: String) => {
        if(sectionId){
          console.log(sectionId);

          console.log(this.projectId);
          this.http.get(`http://localhost:8080/projets/create-section?projectId=${this.projectId}&sectionId=${sectionId}`, {responseType: 'text'}).subscribe(
            (response) => {
              this.observableService.notifySection();
              this.router.navigate(['/', this.id, 'project', this.projectId]);
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de la section', error);
            }
          );
        } else{
          console.error('sectionId null');
        }
      },
      (error) => {
        console.error('Erreur lors de la création de la section', error);
      }
    );
    this.dialogRef.close();
  }
}
