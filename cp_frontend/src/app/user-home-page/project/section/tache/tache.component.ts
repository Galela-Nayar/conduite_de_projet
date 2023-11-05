import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, mergeMap } from 'rxjs';
import Tache from 'src/interface/Tache';


@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent {
  id: String | null = '';
  projetId: String | null = '';
  sectionId: String | null = '';
  @Input()
  tacheId: string = '';
  tache?: Tache;
  private tacheData = new BehaviorSubject<Tache | null>(null);


  constructor(private http: HttpClient, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit(){
    this.id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    this.projetId = this.route.parent ? this.route.parent.snapshot.paramMap.get('projetId') : null;
    this.sectionId = this.route.parent ? this.route.parent.snapshot.paramMap.get('sectionId') : null;
    if (this.sectionId) {
      this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`).
        subscribe((tacheData: Tache) => {
          this.tache = tacheData;  
          console.log('tacheId : ',this.tacheId + '\ntacheData : ' + tacheData + '\ntache : ' +this.tache);
        })
    }
    console.log("tache: " + this.tache)
  }

  fetchTacheData() {
    console.log('fetchTacheData');
    if (this.tacheId) {
      console.log('tacheId not null');
      this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`)
        .subscribe((tacheData: Tache) => {

          console.log('requeste reponse')
          this.tache = tacheData;  
          console.log('tacheId : ' + this.tacheId + '\ntacheData : ' + tacheData.nom + '\ntache : ' + this.tache.nom);
        });
    }
  }

}
