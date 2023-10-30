import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  email: string = '';
  password: string = '';


  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  goToRegister() {
    this.router.navigate(['/register']);
  }

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