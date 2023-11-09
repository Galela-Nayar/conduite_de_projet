import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  id: string = '';
  projectId: string = '';
  @Input() sectionId!: String;
  nom: string = '';
  
  constructor(private http: HttpClient, private route: ActivatedRoute, 
    private ObservableService: ObservableService, 
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
  ngOnInit() {
    this.sectionId = this.data;
  }

  

  onButtonClick() {
    console.log('create-tache:')
    this.http.get(`http://localhost:8080/taches/create?name=${this.nom}`, {responseType: 'text'}).subscribe(
      (tacheId: String) => {
        console.log('tache created')

        console.log('tacheId: ', tacheId)
        console.log('add-tache:')
        this.http.get(`http://localhost:8080/sections/add-tache?sectionId=${this.sectionId}&tacheId=${tacheId}`, {responseType: 'text'}).subscribe(
          (response) => {
          console.log('tache added')
          this.ObservableService.notifyTask();
          },
          (error) => {
            console.error('Erreur lors de l\'attribution de la tache', error);
          }
        );
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de la création de la tache', error);
      }
    );
  }
}
