import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent {
  @ViewChild('textareaNom') textareaNom!: ElementRef;
  @ViewChild('textareaPrenom') textareaPrenom!: ElementRef;
  @ViewChild('textareaUserName') textareaUserName!: ElementRef;
  @ViewChild('textareaEmail') textareaEmail!: ElementRef;
  @ViewChild('textareaBio') textareaBio!: ElementRef;
  id!: String
  user!: Utilisateur
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  taskSubscription!: Subscription;
  imageSrc!: any
  isEditingNom = false;
  isEditingPrenom = false;
  isEditingUserName = false;
  isEditingEmail = false;
  isEditingBio = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    private observerService: ObservableService,  
    private sanitizer: DomSanitizer,

    private cd: ChangeDetectorRef,
    public dialog: MatDialog) {}

    ngOnInit() {
      this.id = this.route.parent?.snapshot.paramMap.get('id');
      this.taskSubscription = this.observableService
      .getObservableTask()
      .subscribe((response) => {
        this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
        this.user = data;

        let objectURL = 'data:image/jpeg;base64,' + this.user['logo_utilisateur'];
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
    }
    )
  }

  ngAfterViewChecked() {
    if (this.textareaNom) {
      this.adjustTextareaNom({ target: this.textareaNom!.nativeElement });
      this.textareaNom.nativeElement.focus();
    }
    if (this.textareaPrenom) {
      this.adjustTextareaPrenom({ target: this.textareaPrenom!.nativeElement });
      this.textareaPrenom.nativeElement.focus();
    }
    if (this.textareaUserName) {
      this.adjustTextareaUserName({ target: this.textareaUserName!.nativeElement });
      this.textareaUserName.nativeElement.focus();
    }
    if (this.textareaEmail) {
      this.adjustTextareaEmail({ target: this.textareaEmail!.nativeElement });
      this.textareaEmail.nativeElement.focus();
    }
    if (this.textareaBio) {
      this.adjustTextareaBio({ target: this.textareaBio!.nativeElement });
      this.textareaBio.nativeElement.focus();
    }
  }

  updateTaskNom() {
    this.http.get(`http://localhost:8080/utilisateurs/set_nom?id=${this.id}&param=${this.user.nom}`, {responseType:"text"}).
    subscribe((tacheData) => {
      this.updateUtilisateur();
      this.isEditingNom = false;
      this.observerService.notifyTask();
      this.cd.detectChanges()
    })
  }

  adjustTextareaNom(event?: any) {
    let target = event ? event.target : this.textareaNom.nativeElement;
    target.style.height = 'auto';
    target.style.height = (target.scrollHeight) + 'px';
}


updateTaskPrenom() {
  this.http.get(`http://localhost:8080/utilisateurs/set_prenom?id=${this.id}&param=${this.user.prenom}`, {responseType:"text"}).
  subscribe((tacheData) => {
    this.updateUtilisateur();
    this.isEditingPrenom = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  })
}

adjustTextareaPrenom(event?: any) {
  let target = event ? event.target : this.textareaPrenom.nativeElement;
  target.style.height = 'auto';
  target.style.height = (target.scrollHeight) + 'px';
}


updateTaskUserName() {
  this.http.get(`http://localhost:8080/utilisateurs/set_userName?id=${this.id}&param=${this.user.userName}`, {responseType:"text"}).
  subscribe((tacheData) => {
    this.updateUtilisateur();
    this.isEditingUserName = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  },(error) => {
    this.updateUtilisateur();
    this.isEditingUserName = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  })
}

adjustTextareaUserName(event?: any) {
  let target = event ? event.target : this.textareaUserName.nativeElement;
  target.style.height = 'auto';
  target.style.height = (target.scrollHeight) + 'px';
}

updateTaskEmail() {
  this.http.get(`http://localhost:8080/utilisateurs/set_email?id=${this.id}&param=${this.user.email}`, {responseType:"text"}).
  subscribe((tacheData) => {
    this.updateUtilisateur();
    this.isEditingEmail = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  },(error) => {
    this.updateUtilisateur();
    this.isEditingEmail = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  })
}

adjustTextareaEmail(event?: any) {
  let target = event ? event.target : this.textareaEmail.nativeElement;
  target.style.height = 'auto';
  target.style.height = (target.scrollHeight) + 'px';
}

updateTaskBio() {
  this.http.get(`http://localhost:8080/utilisateurs/set_bio?id=${this.id}&param=${this.user.bio}`, {responseType:"text"}).
  subscribe((tacheData) => {
    this.updateUtilisateur();
    this.isEditingBio = false;
    this.observerService.notifyTask();
    this.cd.detectChanges()
  })
}

adjustTextareaBio(event?: any) {
  let target = event ? event.target : this.textareaBio.nativeElement;
  target.style.height = 'auto';
  target.style.height = (target.scrollHeight) + 'px';
}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.selectedFileName = file.name;
      this.selectedFile = file;
    }
  }
  
  removeSelectedFile() {
    this.selectedFileName = null;
    this.selectedFile = null;
  }
  
  saveLogo() {
    if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post(`http://localhost:8080/utilisateurs/set_logo?id=${this.id}`, formData, {responseType: 'text'}).subscribe((data: string) => {
            console.log(data);
            this.updateUtilisateur()
            this.observerService.notifyTask();
            this.cd.detectChanges();
        });

    }
}
  updateUtilisateur() {
    this.taskSubscription = this.observableService
      .getObservableTask()
      .subscribe((response) => {
        this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
      this.user = data;

      let objectURL = 'data:image/jpeg;base64,' + this.user['logo_utilisateur'];
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
    }
    )
  }

}
