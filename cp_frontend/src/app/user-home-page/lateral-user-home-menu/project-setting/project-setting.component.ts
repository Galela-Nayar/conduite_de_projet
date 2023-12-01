import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import { EtiquetteSettingsComponent } from '../../etiquette-settings/etiquette-settings.component';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css'],
})
export class ProjectSettingComponent {
  @Input() projectId!: string;
  contextMenuStyle = {};
  @Input() id: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.id = id;
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if (projectId) this.projectId = projectId;
  }

  navigateToProjectSettings() {
    console.log('id: ' + this.id + '\nprojectId: ' + this.projectId);
    this.router.navigate(['/', this.id, 'parametres-project', this.projectId]);
  }

  showEtiquetteSettings()
  {
    const dialogRef = this.dialog.open(EtiquetteSettingsComponent, {
      data: this.projectId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
