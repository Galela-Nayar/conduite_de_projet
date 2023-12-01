import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css'],
})
export class ModifyTaskComponent implements OnInit {
  projectId!: String;
  sectionId!: String
  tache!: Tache;
  id!: String
  tacheId!: String;
  editingNom: boolean = false;
  sectionForm!: FormGroup;
  membreAttribue!: Utilisateur[];
  membreRestant!: Utilisateur[];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    
    private fb: FormBuilder,
    private observerService: ObservableService,
    public dialogRef: MatDialogRef<ModifyTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: String, projectId: String, sectionId: String, tacheId: String}
  ) {
    this.id = data.id;
    this.sectionId = data.sectionId;
    this.tacheId = data.tacheId;
    this.projectId = data.projectId;
  }

  ngOnInit(): void {
    this.http
      .get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
      .subscribe((tacheData: Tache) => {
        this.tache = tacheData;
        console.log('tache teerminer : ' + this.tache.statutTerminer);
        this.sectionForm = this.fb.group({
          nom: ['', Validators.required],
        });

        this.http
          .get<Utilisateur[]>(
            `http://localhost:8080/taches/membreAttribue?id=${this.tacheId}`
          )
          .subscribe((data: Utilisateur[]) => {
            this.membreAttribue = data;
          });
        this.http
          .get<Utilisateur[]>(
            `http://localhost:8080/taches/membreRestant?id=${this.tacheId}&projectId=${this.projectId}`
          )
          .subscribe((data: Utilisateur[]) => {
            this.membreRestant = data;
          });
      });
  }

  startEditingNom(): void {
    this.editingNom = true;
    this.sectionForm.patchValue({ nom: this.tache.nom });
  }

  saveNomChanges(): void {
    if (this.sectionForm.valid) {
      console.log(this.sectionForm.value.nom);
      this.http
        .put<string>(
          `http://localhost:8080/taches/updateNom?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}&nom=${this.sectionForm.value.nom}`,
          {}
        )
        .subscribe((response) => {
          this.tache.nom = this.sectionForm.value.nom;
          this.observerService.notifyTask();
          this.cancelEditing();
        });
      this.cancelEditing();
    }
  }

  cancelEditing(): void {
    this.editingNom = false;
  }

  swapStatut() {
    this.http
      .get(`http://localhost:8080/taches/swapStatut?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}`, {
        responseType: 'text',
      })
      .subscribe((tacheData) => {
        this.tache.statutTerminer = !this.tache.statutTerminer;
        this.observerService.notifyTask();
        console.log('tache teerminer swap: ' + this.tache.statutTerminer);
      });
  }

  removeUtilisateur(userId: String): void {
    console.log('userId : ' + userId);
    this.http
      .get(
        `http://localhost:8080/taches/remove_collaborateur?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}&collaborateurId=${userId}`,
        { responseType: 'text' }
      )
      .subscribe((data) => {
        if (data.toString().startsWith('ok')) {
          this.http
            .get<Utilisateur>(
              `http://localhost:8080/utilisateurs/user?id=${userId}`
            )
            .subscribe((data: Utilisateur) => {
              if (data) {
                this.membreRestant.push(data);
              }
            });
          this.membreAttribue = this.membreAttribue.filter(
            (user) => user.id !== userId
          );
          this.updateProject();
        }
      });
  }

  addUtilisateur(userId: String): void {
    console.log('userId : ' + userId);
    this.http
      .get(
        `http://localhost:8080/taches/add_collaborateur?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${this.tacheId}&collaborateurId=${userId}`,
        { responseType: 'text' }
      )
      .subscribe((data) => {
        if (data.toString().startsWith('ok')) {
          this.http
            .get<Utilisateur>(
              `http://localhost:8080/utilisateurs/user?id=${userId}`
            )
            .subscribe((data: Utilisateur) => {
              if (data) {
                this.membreAttribue.push(data);
              }
            });
          this.membreRestant = this.membreRestant.filter(
            (user) => user.id !== userId
          );

          this.updateProject();
        }
      });
  }

  updateProject() {
    this.http
      .get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
      .subscribe((data: Tache) => {
        this.tache = data;

        this.http
          .get<Utilisateur[]>(
            `http://localhost:8080/taches/membreAttribue?id=${this.tacheId}`
          )
          .subscribe((data: Utilisateur[]) => {
            this.membreAttribue = data;
          });
        this.http
          .get<Utilisateur[]>(
            `http://localhost:8080/taches/membreRestant?id=${this.tacheId}&projectId=${this.projectId}`
          )
          .subscribe((data: Utilisateur[]) => {
            this.membreRestant = data;
          });
        this.cdr.detectChanges();

        this.observerService.notifyTask();
      });
  }

  onDateInputChange() {
    const formattedDate = formatDate(
      this.tache.dateLimite,
      'dd-MM-yyyy',
      'en-US'
    );
    this.http
      .get(
        `http://localhost:8080/taches/setDateLimite?id=${this.id}&projectId=${this.projectId}&sectionId=${this.sectionId}&tacheId=${this.tache.id}&dateLimite=${formattedDate}`,
        {
          responseType: 'text',
        }
      )
      .subscribe((response2) => {
        console.log('loloololo2');
        console.log('tache added');
        this.observerService.notifyTask();
      });
  }
}
