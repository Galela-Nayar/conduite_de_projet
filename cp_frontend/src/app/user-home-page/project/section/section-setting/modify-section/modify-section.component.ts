import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Section from 'src/interface/Section';

@Component({
  selector: 'app-modify-section',
  templateUrl: './modify-section.component.html',
  styleUrls: ['./modify-section.component.css']
})
export class ModifySectionComponent implements OnInit{
  id!: String
  projectId!: String
  section!: Section;
  sectionId!: String;
  isEditing: boolean = false;
  sectionForm: FormGroup;


  constructor(private httpClient: HttpClient,  
  private fb: FormBuilder, 
  private observerService: ObservableService, 
  public dialogRef: MatDialogRef<ModifySectionComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {id: String, projetId: String, sectionId: String}
  ) {
      this.projectId = data.projetId;
      this.id = data.id;
      this.sectionId = data.sectionId
    this.sectionForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.httpClient.get<Section>(`http://localhost:8080/sections/section?id=${this.sectionId}`).subscribe((response)=>{
      this.section = response;
    })
  }

  startEditing(): void {
    this.isEditing = true;
    this.sectionForm.patchValue({ nom: this.section.nom });
  }

  saveChanges(): void {
    if (this.sectionForm.valid) {
      console.log(this.sectionForm.value.nom)
      this.httpClient.put<string>(`http://localhost:8080/sections/updateNom?id=${this.sectionId}&nom=${this.sectionForm.value.nom}`,{})
        .subscribe((response) => {
            this.section.nom=this.sectionForm.value.nom;
            this.observerService.notifyTask();
            this.isEditing = false;
        });
      this.isEditing = false;
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  supprimer(idTask: string): void {
    this.httpClient.get(`http://localhost:8080/taches/removeTache?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${idTask}`, { responseType: 'text' }).subscribe((response: string) => {
      console.log("supprimer tache : " + response)
      this.httpClient.get(`http://localhost:8080/sections/removeTache?id=${this.sectionId}&tacheId=${idTask}`, { responseType: 'text' }).subscribe((response2: string) => {
        console.log("supprimer tache dans section: " + response)
        this.observerService.notifyTask();
        for (let i = 0; i < this.section.taches.length; i++) {
          if (this.section.taches[i] === idTask) {
            this.section.taches.splice(i, 1);
            break;
          }
        }
      });
    });
  }


}
