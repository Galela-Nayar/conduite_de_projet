import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from 'src/interface/Utilisateur';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  id!: string | null | undefined;
  
  fields: { key: string, label: string, value: string, saved: boolean }[] = [];
  user!: Utilisateur;
  imageSrc!: any;

  selectedFileName: string | null = null;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef,  private sanitizer: DomSanitizer, private http: HttpClient) { } 
  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id');
    this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
      this.user = data;
      let objectURL = 'data:image/jpeg;base64,' + this.user['logo_utilisateur'];
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    
    this.fields = [
      { key: 'userName', label: 'Nom d\'utilisateur', value: '', saved: false },
      { key: 'nom', label: 'Nom', value: '', saved: false },
      { key: 'prenom', label: 'Prénom', value: '', saved: false },
      { key: 'email', label: 'Email', value: '', saved: false },
      { key: 'bio', label: 'Bio', value: '', saved: false }
    ];
  });
  }

  updateProject(){
    this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
      this.user = data;
      let objectURL = 'data:image/jpeg;base64,' + this.user['logo_utilisateur'];
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    
    });
    this.cdr.detectChanges();
  }

  getUserProperty(key: string): any {
    return this.user[key];
  }

  save(field: { key: any; value: any; saved: boolean; }): void {
    console.log(`http://localhost:8080/utilisateurs/set_${field.key}?id=${this.id}&param=${field.value}`)
    this.http.get(`http://localhost:8080/utilisateurs/set_${field.key}?id=${this.id}&param=${field.value}`, {responseType: 'text'}).subscribe((data: string) => {
      if (data.toString().startsWith('ok')) {
        field.saved = true;
      }
      this.updateProject()
    });
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
        });
        this.updateProject()

    }
}
}