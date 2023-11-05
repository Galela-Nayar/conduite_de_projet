import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Tache from 'src/interface/Tache';


@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent {
  @Input()
  tacheId: string = '';
  tache?: Tache;


  constructor(private http: HttpClient, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit(){   
    this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`).
      subscribe((tacheData: Tache) => {
        this.tache = tacheData;  
        console.log('tacheId : ',this.tacheId + '\ntacheData : ' + tacheData + '\ntache : ' +this.tache);
      })
    console.log("tache: " + this.tache)
  }
}
