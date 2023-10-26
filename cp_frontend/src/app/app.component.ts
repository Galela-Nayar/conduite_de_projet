import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cp_frontend';

    user = {
      nom: '',
      prenom: '',
      user_name: '',
      mail: '',
      miniature: '',
      bio: ''
    };

  constructor(private http: HttpClient) {}

  createUtilisateur() {
    console.log("1111111111");
    const headers = { 'Content-Type': 'application/json' };
    console.log("222222222222");

    this.http.post('http://localhost:8080/utilisateurs/create', this.user, { headers }).subscribe(
      (response) => {
        console.log('Utilisateur créé avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
      }
    );
    console.log("333333333");
  }
}
  

