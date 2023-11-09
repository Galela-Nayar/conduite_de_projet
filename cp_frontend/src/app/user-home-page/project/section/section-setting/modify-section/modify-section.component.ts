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


  section!: Section;
  @Input() sectionId: string = '';
  isEditing: boolean = false;
  sectionForm: FormGroup;


  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: string, 
  private fb: FormBuilder, private observerService: ObservableService, public dialogRef: MatDialogRef<ModifySectionComponent>) {
    this.sectionForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sectionId = this.data;
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
          this.dialogRef.close();
            this.observerService.notifyTask();
            this.isEditing = false;
        });
      this.isEditing = false;
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

}
