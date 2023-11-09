import { Component } from '@angular/core';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent {
  etatActuel: string = 'Démarrage';
  menuVisible: boolean = false;

  afficherMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  changerEtat(nouvelEtat: string): void {
    this.etatActuel = nouvelEtat;
  }
}
