import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css'],
})
export class PasswordChangeDialogComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  email: string;
  idUser: string;

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    // this.email = data.email;
    // this.idUser = data.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePassword(
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): boolean {
    this.http
      .get(
        `http://localhost:8080/utilisateurs/login?email=${this.email}&password=${this.currentPassword}`,
        { responseType: 'text' }
      )
      .subscribe((response) => {
        if (response.valueOf() == '-1') {
          document.body.innerHTML = '';
          const test_connexion_utilisateur = document.createElement('h1');
          test_connexion_utilisateur.textContent = 'mdp incorect';
          document.body.appendChild(test_connexion_utilisateur);
          console.log('mdp incorrect');
        } else {
          if (newPassword !== confirmNewPassword) {
            document.body.innerHTML = '';
            const test_connexion_utilisateur = document.createElement('h1');
            test_connexion_utilisateur.textContent =
              'les mots de passe ne sont pas pareil';
            document.body.appendChild(test_connexion_utilisateur);
            console.log('mdp incorrect');
          } else {
            this.http
              .get(
                `http://localhost:8080/utilisateurs/set_password?id=${this.idUser}&param=${this.newPassword}`
              )
              .subscribe((ressponse2) => {
                console.log('mdp changé');
              });
          }
        }
      });

    return true;
  }
}
