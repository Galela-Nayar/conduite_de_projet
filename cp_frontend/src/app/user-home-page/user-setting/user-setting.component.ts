import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from 'src/interface/Utilisateur';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  id!: string | null | undefined;
  
  fields: { key: string, label: string, value: string, saved: boolean }[] = [];
  user!: Utilisateur;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id');
    this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
      this.user = data;
    
    this.fields = [
      { key: 'userName', label: 'Nom d\'utilisateur', value: '', saved: false },
      { key: 'nom', label: 'Nom', value: '', saved: false },
      { key: 'prenom', label: 'Prénom', value: '', saved: false },
      { key: 'email', label: 'Email', value: '', saved: false },
      { key: 'bio', label: 'Bio', value: '', saved: false }
    ];
  });
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
    });
  }
}