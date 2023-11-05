import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-setting',
  templateUrl: './section-setting.component.html',
  styleUrls: ['./section-setting.component.css']
})
export class SectionSettingComponent {
  @Input() mouseX!: number;
  @Input() mouseY!: number;
  @Input() sectionId!: String;
  showContextMenu = true;
  contextMenuStyle = {};
  id: string = '';
  projectId: string = '';
  nom: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const x = this.route.snapshot.paramMap.get('x');
    if(x) this.mouseX =  parseInt(x);
    const y = this.route.snapshot.paramMap.get('y');
    if(y) this.mouseY =  parseInt(y);
    this.contextMenuStyle = {
      'position': 'absolute',
      'left': `${this.mouseX}px`,
      'top': `${this.mouseY}px`
    };
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id) this.id = id;
    const projectId = this.route.parent ? this.route.parent.snapshot.paramMap.get('projectId') : null;
    if(projectId) this.projectId = projectId;
    

  }
  supprimer(){

  }

  ajouterTache(){
    
  }
}
