import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  error: string = ''; // Ajout d'une variable pour gérer les erreurs

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { email: string; id: string }
  ) {
    this.email = data.email;
    this.idUser = data.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePassword() {
    this.error = ''; // Réinitialisation de la variable d'erreur à chaque appel
    console.log('pooooooooooooo');
    this.http
      .get(
        `http://localhost:8080/utilisateurs/login?email=${this.email}&password=${this.currentPassword}`,
        { responseType: 'text' } // Spécifier que la réponse est en texte brut
      )
      .subscribe(
        (response: any) => {
          if (response.trim() !== 'Invalid email or password') {
            const userId = response.trim(); // Supprimer les espaces éventuels dans la réponse
            if (this.newPassword !== this.confirmNewPassword) {
              this.error = 'Les mots de passe ne correspondent pas'; // Gestion de l'erreur
              console.log('Les mots de passe ne correspondent pas');
              alert('Les mots de passe ne correspondent pas');
            } else {
              // Utilisation de la méthode GET pour changer le mot de passe
              this.http
                .get(
                  `http://localhost:8080/utilisateurs/set_password?id=${userId}&param=${this.newPassword}`,
                  { responseType: 'text' }
                )
                .subscribe(
                  () => {
                    console.log('Mot de passe changé avec succès');
                    this.dialogRef.close(true); // Fermeture de la boîte de dialogue avec un indicateur de succès
                    alert('Mot de passe changé avec succès');
                  },
                  (error) => {
                    console.error(
                      'Erreur lors du changement du mot de passe',
                      error
                    );
                    this.error = 'Erreur lors du changement du mot de passe'; // Gestion de l'erreur
                    alert('Erreur lors du changement du mot de passe');
                  }
                );
            }
          } else {
            this.error =
              'Mot de passe actuel incorrect ou utilisateur non trouvé'; // Gestion de l'erreur
            console.log(
              'Mot de passe actuel incorrect ou utilisateur non trouvé'
            );
            alert('Mot de passe actuel incorrect ou utilisateur non trouvé');
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la vérification du mot de passe',
            error
          );
          this.error = 'Erreur lors de la vérification du mot de passe'; // Gestion de l'erreur
          alert('Erreur lors de la vérification du mot de passe');
        }
      );
  }
}
