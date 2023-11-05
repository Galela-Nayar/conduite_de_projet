import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent {
  @Input() mouseX!: number;
  @Input() mouseY!: number;
  id: string = '';
  projectId: string = '';
  nom: string = '';
  showContextMenu = true;
  contextMenuStyle = {};
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private observableService: ObservableService) {}
  
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
    if(id){
      this.id = id;

      console.log("id: " + this.id);
    } else {

      console.log("id (null): " + this.id);
    }
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if(projectId){
      this.projectId = projectId;

      console.log("projectId: " + this.projectId);
    } else {

      console.log("projectId (null): " + this.projectId);
    }
  }



  onButtonClick() {

    this.http.get(`http://localhost:8080/sections/create?name=${this.nom}`, {responseType: 'text'}).subscribe(
      (sectionId: String) => {
        if(sectionId){
          console.log(sectionId);

          console.log(this.projectId);
          this.http.get(`http://localhost:8080/projets/create-section?projectId=${this.projectId}&sectionId=${sectionId}`, {responseType: 'text'}).subscribe(
            (response) => {
              this.router.navigate(['/', this.id, 'project', this.projectId]);
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de la section', error);
            }
          );
          this.observableService.notifySection();
        } else{
          console.error('sectionId null');
        }
      },
      (error) => {
        console.error('Erreur lors de la création de la section', error);
      }
    );
  }
}
