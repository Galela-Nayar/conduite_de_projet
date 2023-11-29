import { Component, Input } from '@angular/core';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-mini-user-profil',
  templateUrl: './mini-user-profil.component.html',
  styleUrls: ['./mini-user-profil.component.css']
})
export class MiniUserProfilComponent {
  @Input() user!: Utilisateur
  @Input() id!: String

}
