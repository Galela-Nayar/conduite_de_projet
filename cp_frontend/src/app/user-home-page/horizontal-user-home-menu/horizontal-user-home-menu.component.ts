import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Utilisateur from '../../../interface/Utilisateur';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-horizontal-user-home-menu',
  templateUrl: './horizontal-user-home-menu.component.html',
  styleUrls: ['./horizontal-user-home-menu.component.css']
})
export class HorizontalUserHomeMenuComponent {
  id!: string;
  user!: Utilisateur;
  imageSrc!: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private projetService: ObservableService) {}


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
    }
    this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe(
      (data: Utilisateur)=>{
        this.user = data;
        let objectURL = 'data:image/jpeg;base64,' + this.user['logo_utilisateur'];
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

}
