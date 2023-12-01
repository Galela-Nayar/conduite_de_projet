import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Etiquette from 'src/interface/Etiquette';
import Project from 'src/interface/Project';
import Tache from 'src/interface/Tache';

@Component({
  selector: 'app-etiquette-taches',
  templateUrl: './etiquette-taches.component.html',
  styleUrls: ['./etiquette-taches.component.css']
})
export class EtiquetteTachesComponent {
  projectId!: string | null | undefined;
  tache!: Tache;
  tacheId: string = '';
  listeEtiquette: any[] = [];
  listeInTache: any[] = [];
  listeChecked: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private observerService: ObservableService,
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
              this.observerService.notifyTask();
          });
      } else {
        this.http
          .get(`http://localhost:8080/taches/remove_etiquette?idTache=${this.tacheId}&idEtiquette=${id}`, {
            responseType: 'text',
          })
          .subscribe((response: String) => {
            console.log("supprimé !")
            this.observerService.notifyTask();
        });
      }
  }
}
