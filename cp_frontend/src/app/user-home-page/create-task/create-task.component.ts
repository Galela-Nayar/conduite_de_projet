import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  id!: String;
  projectId!: String;
  sectionId!: String;
  nom: string = '';
  @Input() dateLimite!: Date;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ObservableService: ObservableService,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: String, projectId: String, sectionId: String}
  ) {
    this.id = data.id;
    this.projectId = data.projectId;
    this.sectionId = data.sectionId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onButtonClick() {
    console.log('create-tache:', this.dateLimite);
    this.http
      .get(`http://localhost:8080/taches/create?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&name=${this.nom}`, {
        responseType: 'text',
      })
      .subscribe(
        (tacheId: String) => {
          console.log('tache created');

          console.log('tacheId: ', tacheId);
          console.log('add-tache:');
          this.http
            .get(
              `http://localhost:8080/sections/add-tache?sectionId=${this.sectionId}&tacheId=${tacheId}`,
              { responseType: 'text' }
            )
            .subscribe(
              (response) => {
                if (this.dateLimite != undefined) {
                  console.log(this.dateLimite);
                  const formattedDate = formatDate(
                    this.dateLimite,
                    'dd-MM-yyyy',
                    'en-US'
                  );
                  this.http
                    .get(
                      `http://localhost:8080/taches/setDateLimite?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${tacheId}&dateLimite=${formattedDate}`,
                      {
                        responseType: 'text',
                      }
                    )
                    .subscribe((response2) => {
                      console.log('loloololo2');
                      console.log('tache added');
                      this.ObservableService.notifyTask();
                    });
                } else {
                  console.log('tache added');
                  this.ObservableService.notifyTask();
                }
              },
              (error) => {
                console.error(
                  "Erreur lors de l'attribution de la tache",
                  error
                );
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
