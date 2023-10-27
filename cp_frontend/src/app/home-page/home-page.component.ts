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

    this.http.post('http://localhost:8080/login', user, { headers }).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Handle successful login
      },
      (error) => {
        console.error('Error during login', error);
        // Handle login error
      }
    );
  }
}