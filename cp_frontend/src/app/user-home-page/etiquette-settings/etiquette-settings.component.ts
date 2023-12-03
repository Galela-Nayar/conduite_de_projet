import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
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
  listeEtiquette: any[] = [];
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: FormControl = new FormControl(null);

  isEditingEtiquette: boolean[] = [];
  isEditing: boolean = false;


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
    this.listeEtiquette = [];
    this.isEditingEtiquette = [];
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
          this.isEditingEtiquette.push(false);
        }
        console.log(this.listeEtiquette);
    });
  }

  updateWindow()
  {
    this.listeEtiquette = [];
    this.isEditingEtiquette = [];
    this.nom = "";
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
          this.isEditingEtiquette.push(false);
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

  ajouter()
  {
    let ajouterCouleur = this.colorCtr.value.hex;
    console.log(`http://localhost:8080/etiquettes/create?nom=${this.nom}&couleur=${ajouterCouleur}`);
    
    this.http.get(`http://localhost:8080/etiquettes/create?nom=${this.nom}&couleur=${ajouterCouleur}`, {responseType: 'text'}).subscribe(
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

  editer(i: number)
  {
    this.isEditingEtiquette[i] = true;
    this.isEditing = true;
  }

  annulerEdition(i: number)
  {
    this.isEditingEtiquette[i] = false;
    this.isEditing = false;
  }

  updateEtiquette()
  {

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
