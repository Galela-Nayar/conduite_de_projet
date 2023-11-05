import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../../section.service';

@Component({
  selector: 'app-tache-setting',
  templateUrl: './tache-setting.component.html',
  styleUrls: ['./tache-setting.component.css']
})
export class TacheSettingComponent {

  @Input() mouseX!: number;
  @Input() mouseY!: number;
  @Input() tacheId!: String;
  contextMenuStyle = {};
  sectionId: String | null = '';

  constructor(private http: HttpClient, private sectionService: SectionService, private route: ActivatedRoute) {}

  ngOnInit() {
    const x = this.route.snapshot.paramMap.get('x');
    if(x) this.mouseX =  parseInt(x);
    const y = this.route.snapshot.paramMap.get('y');
    if(y) this.mouseY =  parseInt(y);
    const tacheId = this.route.snapshot.paramMap.get('tacheId');
    if(tacheId) this.tacheId = tacheId;
    if(!this.route.parent) console.log("!!! route parent doesn't exist !!!")
    this.sectionService.currentSectionId.subscribe(sectionId => this.sectionId = sectionId);
    this.contextMenuStyle = {
      'position': 'absolute',
      'left': `${this.mouseX}px`,
      'top': `${this.mouseY}px`
    };
  }

  supprimer(){
    this.http.get(`http://localhost:8080/taches/removeTache?id=${this.tacheId}`,{responseType: 'text'}).subscribe((response:String)=>{
      console.log("supprimer tache : " + response)
      this.http.get(`http://localhost:8080/sections/removeTache?id=${this.sectionId}&tacheId=${this.tacheId}`,{responseType: 'text'}).subscribe((response2: String)=>{
        console.log("supprimer tache dans section: " + response)
      })
    })
  }
}
