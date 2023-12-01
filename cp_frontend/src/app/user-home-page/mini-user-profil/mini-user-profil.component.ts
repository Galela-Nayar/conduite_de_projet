import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Utilisateur from 'src/interface/Utilisateur';

@Component({
  selector: 'app-mini-user-profil',
  templateUrl: './mini-user-profil.component.html',
  styleUrls: ['./mini-user-profil.component.css']
})
export class MiniUserProfilComponent implements OnInit {
  @Input() user!: Utilisateur
  @Input() membre!: Utilisateur
  @Input() id!: String
  taskSubscription!: Subscription
  isFriend!: boolean


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    private observerService: ObservableService,

    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){

    this.taskSubscription = this.observableService
      .getObservableTask()
      .subscribe((response) => {
        this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
        this.user = data;
        this.isFriend = this.Friend();
      })
    })

  }

  ajouterAmi(){
    this.http.get(`http://localhost:8080/utilisateurs/add_ami?id=${this.id}&idAmi=${this.membre.id}`, {responseType: 'text'}).subscribe((data: string) => {

    this.updateUtilisateur();
    this.observerService.notifyTask();
    this.cd.detectChanges()
    });
  }


  supprimerAmi(){
    this.http.get(`http://localhost:8080/utilisateurs/suppr_ami?id=${this.id}&idAmi=${this.membre.id}`, {responseType: 'text'}).subscribe((data: string) => {

    this.updateUtilisateur();
    this.observerService.notifyTask();
    this.cd.detectChanges()
    });
  }

  updateUtilisateur() {
    this.taskSubscription = this.observableService
      .getObservableTask()
      .subscribe((response) => {
        this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.id}`).subscribe((data: Utilisateur) => {
        this.user = data;
        this.isFriend = this.Friend()
      })
    })
  }
  Friend(): boolean {
    let find = false
      this.user.listAmis.forEach(amiId => {
        if(amiId == this.membre.id) find = true
      });
    return find

}
}

