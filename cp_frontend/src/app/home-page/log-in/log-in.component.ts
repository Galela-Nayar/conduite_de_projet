import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  submitForm() {
    const user = {
      email: this.email,
      password: this.password
    };

    const headers = { 'Content-Type': 'application/json' };

    this.http.get(`http://localhost:8080/utilisateurs/login?email=${this.email}&password=${this.password}`, {responseType: 'text'}).subscribe(
      (response) => {
        if(response.valueOf() == "-0"){
          document.body.innerHTML = "";
          const test_connexion_utilisateur = document.createElement("h1");
          test_connexion_utilisateur.textContent = "l'utisateur n'existe pas"
          document.body.appendChild(test_connexion_utilisateur);
          console.log("l'utisateur n'existe pas");
        }
        else if(response.valueOf() == "-1") {
          document.body.innerHTML = "";
          const test_connexion_utilisateur = document.createElement("h1");
          test_connexion_utilisateur.textContent = "existe mais mdp ou email incorect"
          document.body.appendChild(test_connexion_utilisateur);
          console.log("existe mais mdp ou email incorrect");
        }
        else{
          this.router.navigate([response.valueOf() + '/home'])
        }
      },
    );
  }
}