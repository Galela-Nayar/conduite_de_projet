import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Etiquette from 'src/interface/Etiquette';
import Project from 'src/interface/Project';
import Section from 'src/interface/Section';

@Component({
  selector: 'app-etiquette-settings',
  templateUrl: './etiquette-settings.component.html',
  styleUrls: ['./etiquette-settings.component.css']
})
export class EtiquetteSettingsComponent {
  projectId: string = '';
  project: Project;

  nom: string = '';
  isCreating : boolean = false;
  symbole : string = '+';
  colors: string[] = ['Blue', 'Red', 'Green', 'Orange', 'Aqua', 'Yellow', 'Pink', 'Purple'];
  couleurActuel: string = 'Blue';
  listeEtiquette: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EtiquetteSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit() {
    this.projectId = this.data;
    this.http
      .get<Project>(
        `http://localhost:8080/projets/projet?id=${this.projectId}`
      )
      .subscribe((projectData: Project) => {
        this.project = projectData;
        const listeId = projectData.etiquettes;
        for(let id of listeId)
        {
          this.http.get<Etiquette>(`http://localhost:8080/etiquettes/getById?id=${id}`)
          .subscribe((data : Etiquette) => {this.listeEtiquette.push(data)});
        }
        console.log(this.listeEtiquette);
    });
  }

  updateWindow()
  {
    this.listeEtiquette = [];
    this.http
      .get<Project>(
        `http://localhost:8080/projets/projet?id=${this.projectId}`
      )
      .subscribe((projectData: Project) => {
        this.project = projectData;
        const listeId = projectData.etiquettes;
        for(let id of listeId)
        {
          this.http.get<Etiquette>(`http://localhost:8080/etiquettes/getById?id=${id}`)
          .subscribe((data : Etiquette) => {this.listeEtiquette.push(data)});
        }
        console.log(this.listeEtiquette);
      });
  }

  plus()
  {
    this.isCreating = !this.isCreating;
    if(this.isCreating == true)
    {
      this.symbole = '-';
    }
    else
    {
      this.symbole = '+';
    }
  }

  selectColor(color: string) {
    this.couleurActuel = color;
    console.log(this.couleurActuel);
  }

  ajouter()
  {

    this.http.get(`http://localhost:8080/etiquettes/create?nom=${this.nom}&couleur=${this.couleurActuel}`, {responseType: 'text'}).subscribe(
      (etiquetteId: String) => {
        if(etiquetteId){
          this.http.get(`http://localhost:8080/projets/addEtiquette?idProjet=${this.projectId}&idEtiquette=${etiquetteId}`, {responseType: 'text'}).subscribe(
            (response) => {
              this.observableService.notifyProject();
              this.updateWindow();
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de etiquette', error);
            }
          );
        } else{
          console.error('etiquetteId null');
        }
      },
      (error) => {
        console.error('Erreur lors de la création de etiquette', error);
      }
    );
    this.plus();
  }

  supprimer(etiquette : Etiquette)
  {
    this.http.get(`http://localhost:8080/projets/removeEtiquette?idProjet=${this.projectId}&idEtiquette=${etiquette.id}`, {responseType: 'text'}).subscribe(
      (response: String) => {
      const sections = this.project.sections;
          let taches = [];
          let vraiSections = [];
          for(let section of sections)
          {
            this.http
            .get<Section>(
              `http://localhost:8080/sections/section?id=${section}`
            )
            .subscribe((response) => {
              vraiSections.push(response);
              let tachesSection = response.taches;
              for(let tache of tachesSection)
              {
                taches.push(tache);
              }
              for(let tacheId of taches)
              {
                this.http
                    .get(`http://localhost:8080/taches/remove_etiquette?idTache=${tacheId}&idEtiquette=${etiquette.id}`, {
                      responseType: 'text',
                    })
                    .subscribe((response: String) => {
                });
              }
            });
          }
        this.http.get(`http://localhost:8080/etiquettes/delete?id=${etiquette.id}`, {responseType: 'text'}).subscribe(
          (response: String) => {
            this.observableService.notifyProject();
            this.observableService.notifyTask();
            this.updateWindow();
          }
        );
      }
    );

  }
}
