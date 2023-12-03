import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-app',
  templateUrl: './log-app.component.html',
  styleUrls: ['./log-app.component.scss'],
})
export class LogAppComponent implements AfterViewInit {
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
  };

  email!: string;
  password!: string;
  // Gestion de input du formulaire
  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    const formElements = document.querySelectorAll(
      '.form input, .form textarea'
    );

    formElements.forEach((element: Element) => {
      const inputElement = element as HTMLInputElement;
      const label = inputElement.previousElementSibling;

      if (inputElement instanceof HTMLInputElement) {
        inputElement.addEventListener('keyup', (e) => {
          if (e.type === 'keyup') {
            if (inputElement.value === '') {
              label?.classList.remove('active', 'highlight');
            } else {
              label?.classList.add('active', 'highlight');
            }
          } else if (e.type === 'blur') {
            if (inputElement.value === '') {
              label?.classList.remove('active', 'highlight');
            } else {
              label?.classList.remove('highlight');
            }
          } else if (e.type === 'focus') {
            if (inputElement.value === '') {
              label?.classList.remove('highlight');
            } else if (inputElement.value !== '') {
              label?.classList.add('highlight');
            }
          }
        });
      }
    });

    // Gestion de navivation du formulaire (login & signup)
    const tabs = this.el.nativeElement.querySelectorAll('.tab a');

    tabs.forEach((tab: HTMLElement) => {
      this.renderer.listen(tab, 'click', (e) => {
        e.preventDefault();

        const parentElement = tab.parentElement as HTMLElement;
        parentElement.classList.add('active');

        const parentElementParent = parentElement.parentElement;
        if (parentElementParent) {
          Array.from(
            parentElementParent.children as HTMLCollectionOf<HTMLElement>
          ).forEach((child: HTMLElement) => {
            if (child !== parentElement) {
              child.classList.remove('active');
            }
          });
        }

        const target = tab.getAttribute('href');
        const tabContents =
          this.el.nativeElement.querySelectorAll('.tab-content > div');

        tabContents.forEach((tabContent: HTMLElement) => {
          if ('#' + tabContent.id !== target) {
            this.renderer.setStyle(tabContent, 'display', 'none');
          } else {
            this.renderer.setStyle(tabContent, 'display', 'block');
          }
        });
      });
    });
  }

  onSubmitForm(form: NgForm) {
    // Logique pour la soumission du formulaire d'inscription ici
    console.log(form.value); // Affichage du contenu du formulaire sur la console

    const headers = { 'Content-Type': 'application/json' };

    this.http
      .post('http://localhost:8080/utilisateurs/create', this.user)
      .subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès', response);
        },
        (error) => {
          console.error("Erreur lors de la création de l'utilisateur", error);
        }
      );
  }

  onSubmit(form: NgForm) {
    // Logique pour la soumission du formulaire de connexion ici

    console.log(form.value); // Affichage du contenu du formulaire sur la console
    const headers = { 'Content-Type': 'application/json' };

    this.http
      .get(
        `http://localhost:8080/utilisateurs/login?email=${this.email}&password=${this.password}`
      )
      .subscribe((response) => {
        if (response.valueOf() == 1) {
          document.body.innerHTML = '';
          const test_connexion_utilisateur = document.createElement('h1');
          test_connexion_utilisateur.textContent =
            'wéééééé il existe et peut se connecté';
          document.body.appendChild(test_connexion_utilisateur);
        } else if (response.valueOf() == 2) {
          document.body.innerHTML = '';
          const test_connexion_utilisateur = document.createElement('h1');
          test_connexion_utilisateur.textContent =
            'existe mais mdp ou emaail incorrect';
          document.body.appendChild(test_connexion_utilisateur);
          console.log('existe mais mdp ou emaail incorrect');
        } else {
          document.body.innerHTML = '';
          const test_connexion_utilisateur = document.createElement('h1');
          test_connexion_utilisateur.textContent = "l'ulisateur n'existe pas";
          document.body.appendChild(test_connexion_utilisateur);
          console.log("l'ulisateur n'existe pas");
        }
      });
  }
}
