import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Input() mouseX!: number;
  @Input() mouseY!: number;
  id: string = '';
  projectId: string = '';
  @Input() sectionId!: String;
  nom: string = '';
  showContextMenu = true;
  contextMenuStyle = {};
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private ObservableService: ObservableService) {}
  
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

  

  onButtonClick() {
    console.log('create-tache:')
    this.http.get(`http://localhost:8080/taches/create?name=${this.nom}`, {responseType: 'text'}).subscribe(
      (tacheId: String) => {
        console.log('tache created')

        console.log('tacheId: ', tacheId)
        console.log('add-tache:')
        this.http.get(`http://localhost:8080/sections/add-tache?sectionId=${this.sectionId}&tacheId=${tacheId}`, {responseType: 'text'}).subscribe(
          (response) => {
          console.log('tache added')
          this.ObservableService.notifyTask();
          },
          (error) => {
            console.error('Erreur lors de l\'attribution de la tache', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la création de la tache', error);
      }
    );
  }
}
