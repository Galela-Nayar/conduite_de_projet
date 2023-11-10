import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent {

  @Input() mouseX!: number;
  @Input() mouseY!: number;
  @Input() projectId!: string;
  contextMenuStyle = {};
  id: string = '';

  constructor(private router: Router,private http: HttpClient, private route: ActivatedRoute) {}

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
    const id = this.route.snapshot.paramMap.get('id');
    if(id) this.id = id;
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if(projectId) this.projectId = projectId;
  }


  navigateToProjectSettings() {
    console.log('id: ' + this.id + '\nprojectId: ' + this.projectId)
    this.router.navigate(['/', this.id, 'parametres-project', this.projectId]);
}

}
