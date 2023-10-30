import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lateral-user-home-menu',
  templateUrl: './lateral-user-home-menu.component.html',
  styleUrls: ['./lateral-user-home-menu.component.css']
})
export class LateralUserHomeMenuComponent implements OnInit {
  id!: string;
  projects: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {} // Inject ActivatedRoute

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.http.get<any[]>(`http://localhost:8080/utilisateurs/projects?id=${this.id}`).subscribe((projects) => {
        this.projects = projects;
      });
    }
  }
}