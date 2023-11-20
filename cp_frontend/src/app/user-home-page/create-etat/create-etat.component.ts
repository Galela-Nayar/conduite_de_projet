import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Section from 'src/interface/Section';

@Component({
  selector: 'app-create-etat',
  templateUrl: './create-etat.component.html',
  styleUrls: ['./create-etat.component.css']
})
export class CreateEtatComponent {
  id: string = '';
  projectId: string = '';
  nom: string = '';
  estEtat: boolean = true;
  showContextMenu = true;
  contextMenuStyle = {};
  sections: any[] = [];
  nomSections: any[] = [];
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
    private observableService: ObservableService,
    public dialogRef: MatDialogRef<CreateEtatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.projectId = this.data;
    //On recupere les etats 
    this.http.get<Section[]>(`http://localhost:8080/projets/getSectionNotEtat?id=${this.projectId}`)
      .subscribe((sections: Section[]) => {
        this.sections = sections;
    });
  }

  handleClickOnSection(event: any, valeur: string) {
    console.log(`Section : ${valeur}`);
    const isChecked = event.target.checked;
    this.http.put<string>(`http://localhost:8080/sections/updateEstEtat?id=${valeur}&estEtat=${isChecked}`,{})
    .subscribe((response) => {
        this.observableService.notifyTask();
        this.observableService.notifySection();
    });  
  }


  onCreerClick() {
    this.http.get(`http://localhost:8080/sections/create?name=${this.nom}&estEtat=${this.estEtat}`, {responseType: 'text'}).subscribe(
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
