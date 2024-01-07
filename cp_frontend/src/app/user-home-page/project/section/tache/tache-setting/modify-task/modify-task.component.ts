import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Commentaire from 'src/interface/Commentaire';
import Tache from 'src/interface/Tache';
import Utilisateur from 'src/interface/Utilisateur';
import { Directive, HostListener, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';



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
  commentaires!: Commentaire[];
  showMiniUserProfil: boolean = false;
  selectedMembre: Utilisateur
  mouseX: number = 0;
  mouseY: number = 0;
  hideTimeout: number;
  comment: String = "";
  taskSubscription!: Subscription;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust(textArea);
  }

  constructor(
    public element: ElementRef,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private observableService: ObservableService,
    
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
    setTimeout(() => this.adjust(), 0);
    this.taskSubscription = this.observableService
    .getObservableTask().subscribe((response) => {
      this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
      .subscribe((tacheData: Tache) => {
        this.tache = tacheData;
        console.log('tache teerminer : ' + this.tache.statutTerminer);
        this.sectionForm = this.fb.group({
          nom: ['', Validators.required],
        });
        this.taskSubscription = this.observableService
        .getObservableTask().subscribe((response) => {
          this.http.get<Utilisateur[]>(`http://localhost:8080/taches/membreAttribue?id=${this.tacheId}`)
          .subscribe((data: Utilisateur[]) => {
            this.membreAttribue = data;
          });
        });
        this.taskSubscription = this.observableService
        .getObservableTask().subscribe((response) => {
          this.http.get<Utilisateur[]>(`http://localhost:8080/taches/membreRestant?id=${this.tacheId}&projectId=${this.projectId}`)
          .subscribe((data: Utilisateur[]) => {
            this.membreRestant = data;
          });
        });
        this.taskSubscription = this.observableService
        .getObservableTask().subscribe((response) => {
          this.http.get<Commentaire[]>( `http://localhost:8080/taches/commentaires?id=${this.tacheId}`)
          .subscribe((data: Commentaire[]) => {
            this.commentaires = data;
            console.log("commentaires : " + this.commentaires + this.commentaires[0].message)
            console.log( this.commentaires)
          });
        });
      });
    });
  }

  updateTache(){
    this.taskSubscription = this.observableService
    .getObservableTask().subscribe((response) => {
      this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
      .subscribe((tacheData: Tache) => {
        this.tache = tacheData;
        console.log('tache teerminer : ' + this.tache.statutTerminer);
        this.sectionForm = this.fb.group({
          nom: ['', Validators.required],
        });
        this.taskSubscription = this.observableService
        .getObservableTask().subscribe((response) => {
          this.http.get<Utilisateur[]>(`http://localhost:8080/taches/membreAttribue?id=${this.tacheId}`)
          .subscribe((data: Utilisateur[]) => {
            this.membreAttribue = data;
          });
        });
        this.taskSubscription = this.observableService
        .getObservableTask().subscribe((response) => {
          this.http.get<Utilisateur[]>(`http://localhost:8080/taches/membreRestant?id=${this.tacheId}&projectId=${this.projectId}`)
          .subscribe((data: Utilisateur[]) => {
            this.membreRestant = data;
          });
        });
        this.taskSubscription = this.observableService
        .getObservableTask().subscribe((response) => {
          this.http.get<Commentaire[]>( `http://localhost:8080/taches/commentaires?id=${this.tacheId}`)
          .subscribe((data: Commentaire[]) => {
            this.commentaires = data;
            console.log("commentaires : " + this.commentaires + this.commentaires[0].message)
            console.log( this.commentaires)
          });
        });
      });
    });
  }

  adjust(textArea?: HTMLTextAreaElement): void {
    if(textArea){
      textArea = textArea || this.element.nativeElement.getElementsByTagName('textarea')[0];
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }

  envoyer(){
    console.log("comment : " + this.comment)
    let date = new Date();
    let formattedDate = date.toLocaleDateString('en-GB');

    let commentaire: Commentaire ={
    id:  this.generateUUID(),
    createurId:  this.id,
    createdAt:  new Date(),
    tacheId:  this.tacheId,
    message:  this.comment + ", le " + formattedDate + " à " + new Date().getHours() + ":" + new Date().getMinutes() + "."
    }
    this.http.post(`http://localhost:8080/commentaires/add_commentaire`,commentaire, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }).subscribe(
      response => {
        this.comment = ""
      }
    )
    this.updateTache();
    this.cdr.detectChanges();
    this.observerService.notifyTask();
  }

  generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  

  showMiniUserProfile(membre: any,  event: MouseEvent) {
    this.hideTimeout = setTimeout(() => {
      
      const rect = (event.target as Element).getBoundingClientRect();
      this.mouseX = rect.left;
      this.mouseY = rect.bottom;
      this.http
          .get<Utilisateur>(
            `http://localhost:8080/utilisateurs/user?id=${membre}`
          )
          .subscribe((data: Utilisateur) => {
            this.selectedMembre = data;
          });
      this.showMiniUserProfil = true;
    }, 700); // adjust the delay as needed
  }
  
  hideMiniUserProfile() {
    this.hideTimeout = setTimeout(() => {
      this.showMiniUserProfil = false;
    }, 150); // adjust the delay as needed
  }
  
  cancelHideMiniUserProfile() {
    clearTimeout(this.hideTimeout);
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
          this.http
          .get<Commentaire[]>(
            `http://localhost:8080/taches/commentaires?id=${this.tacheId}`
          )
          .subscribe((data: Commentaire[]) => {
            this.commentaires = data;
            console.log("commentaires : " + this.commentaires)
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
