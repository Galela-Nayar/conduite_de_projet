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

    this.http.get(`http://localhost:8080/utilisateurs/login?email=${this.email}&password=${this.password}`).subscribe(
      (response) => {
        if(response.valueOf()== 1){
          document.body.innerHTML = "";
          const test_connexion_utilisateur = document.createElement("h1");
          test_connexion_utilisateur.textContent = "wéééééé il existe et peut se connecté"
          document.body.appendChild(test_connexion_utilisateur);
        }
        else if(response.valueOf() == 2) {
          console.log("existe mais mdp ou emaail incorrect");
        }
        else{
          console.log("l'ulisateur n'xiste pas");
        }
      },
    );
  }
}