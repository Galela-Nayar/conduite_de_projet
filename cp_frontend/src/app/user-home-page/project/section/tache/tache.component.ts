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
  @Input()
  sectionId: String | null = '';
  @Input()
  tacheId: string = '';
  tache?: Tache;
  mouseX: number = 0;
  mouseY: number = 0;
  showSetting = false;
  

  constructor(private http: HttpClient, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit(){
    if (this.tacheId) {
      this.http.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`).
        subscribe((tacheData: Tache) => {
          this.tache = tacheData;  
          console.log('tacheId : ',this.tacheId + '\ntacheData : ' + tacheData + '\ntache : ' +this.tache);
        })
      }
    console.log("tache: " + this.tache)
  }

  

  onSettingClick(event: MouseEvent) {
    this.cd.detectChanges();
  }
}
