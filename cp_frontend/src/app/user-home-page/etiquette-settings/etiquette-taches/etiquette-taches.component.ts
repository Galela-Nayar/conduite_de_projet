import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Etiquette from 'src/interface/Etiquette';
import Project from 'src/interface/Project';
import Section from 'src/interface/Section';
import Tache from 'src/interface/Tache';

@Component({
  selector: 'app-etiquette-taches',
  templateUrl: './etiquette-taches.component.html',
  styleUrls: ['./etiquette-taches.component.css']
})
export class EtiquetteTachesComponent {
  projectId!: string | null | undefined;
  project: Project;
  tache!: Tache;
  tacheId: string = '';
  listeEtiquette: any[] = [];
  listeInTache: any[] = [];
  listeChecked: any[] = [];

  nom: string = '';
  isCreating : boolean = false;
  symbole : string = '+';
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: FormControl = new FormControl(null);

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private observableService: ObservableService,
    public dialogRef: MatDialogRef<EtiquetteTachesComponent>
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.tacheId = this.data.data1;
    this.projectId = this.data.data2;
    this.http
      .get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
      .subscribe((tacheData: Tache) => {
        this.tache = tacheData;
        this.http
        .get<Project>(
          `http://localhost:8080/projets/projet?id=${this.projectId}`
        )
        .subscribe((projectData: Project) => {
          const listeId = projectData.etiquettes;
          for(let id of listeId)
          {
            this.http.get<Etiquette>(`http://localhost:8080/etiquettes/getById?id=${id}`)
            .subscribe((data : Etiquette) => {this.listeEtiquette.push(data)});
          }
          console.log(this.listeEtiquette);
          this.listeChecked = [];
          for(let i = 0; i < listeId.length; i++)
          {
            if(tacheData.etiquettes.includes(listeId[i]))
            {
              this.listeChecked.push(true);
            }
            else
            {
              this.listeChecked.push(false);
            }
          }
          console.log("check : " + this.listeChecked);
      });
    });
    

  }

  changerEtiquette(id: String, event: any)
  {
    const isChecked: boolean = event.target.checked;

      if (isChecked) {
          this.http
            .get(`http://localhost:8080/taches/add_etiquette?idTache=${this.tacheId}&idEtiquette=${id}`, {
              responseType: 'text',
            })
            .subscribe((response: String) => {
              console.log("ajouté !")
              this.observableService.notifyTask();
          });
      } else {
        this.http
          .get(`http://localhost:8080/taches/remove_etiquette?idTache=${this.tacheId}&idEtiquette=${id}`, {
            responseType: 'text',
          })
          .subscribe((response: String) => {
            console.log("supprimé !")
            this.observableService.notifyTask();
        });
      }
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

  editer(etiquette: Etiquette)
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
