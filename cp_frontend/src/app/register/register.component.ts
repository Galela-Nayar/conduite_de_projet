import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'cp_frontend';

    user = {
      nom: '',
      prenom: '',
      username: '',
      email: '',
      password: '',
    };



  constructor(private http: HttpClient, private router: Router) {}

  createUtilisateur() {
    const headers = { 'Content-Type': 'application/json' };

    this.http.post('http://localhost:8080/utilisateurs/create', this.user, {responseType: 'text'}).subscribe(
      (response) => {
        console.log('Utilisateur créé avec succès', response);
        this.router.navigate([''])
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
      }
    );
  }
}