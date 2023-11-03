import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  
  ngOnInit() {
    const id = this.route.parent ? this.route.parent.snapshot.paramMap.get('id') : null;
    if(id) this.id = id;
    const projectId = this.route.parent ? this.route.parent.snapshot.paramMap.get('projectId') : null;
    if(projectId) this.projectId = projectId;
  }

  showContextMenuAtPosition(x: number, y: number) {
    this.showContextMenu = true;
    this.contextMenuStyle = {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`
    };
  }

  hideContextMenu() {
    this.showContextMenu = false;
  }

  onButtonClick() {

    this.http.get(`http://localhost:8080/sections/create?name=${this.nom}`, {responseType: 'text'}).subscribe(
      (sectionId) => {
        this.http.get(`http://localhost:8080/projets/create-section?projectId=${this.projectId}&sectionId=${sectionId}`, {responseType: 'text'}).subscribe(
          (response) => {
            
          },
          (error) => {
            console.error('Erreur lors de la création de l\'utilisateur', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
      }
    );
  }
}
