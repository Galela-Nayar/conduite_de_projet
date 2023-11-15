import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css']
})
export class ModifyTaskComponent implements OnInit{


  tache!:Tache;
  tacheId: string = '';
  editingNom: boolean = false;
  sectionForm!: FormGroup;
  

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: string, private fb: FormBuilder, private observerService: ObservableService, public dialogRef: MatDialogRef<ModifyTaskComponent>){
  }


  
  ngOnInit(): void {
    
    this.tacheId = this.data;
    console.log("avant le get")
    this.httpClient.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`).
    subscribe((tacheData: Tache) => {
      this.tache = tacheData; 
      console.log("tache teerminer : " + this.tache.statutTerminer)
    });
    this.sectionForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  startEditingNom(): void {
    this.editingNom = true;
    this.sectionForm.patchValue({ nom: this.tache.nom });
  }

  saveNomChanges(): void {
    if (this.sectionForm.valid) {
      console.log(this.sectionForm.value.nom)
      this.httpClient.put<string>(`http://localhost:8080/taches/updateNom?id=${this.tacheId}&nom=${this.sectionForm.value.nom}`,{})
        .subscribe((response) => {
            this.tache.nom=this.sectionForm.value.nom;
            this.observerService.notifyTask();
            this.cancelEditing();
        });
      this.cancelEditing();
    }
  }

  cancelEditing(): void {
    this.editingNom = false;
  }

  swapStatut(){
    this.httpClient.get(`http://localhost:8080/taches/swapStatut?id=${this.tacheId}`, {responseType:"text"}).
    subscribe((tacheData) => {
      this.tache.statutTerminer = !this.tache.statutTerminer
      this.observerService.notifyTask();
      console.log("tache teerminer swap: " + this.tache.statutTerminer)
    });
  }

}
