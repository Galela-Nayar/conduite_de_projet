import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';

@Component({
  selector: 'app-horizontal-user-home-menu',
  templateUrl: './horizontal-user-home-menu.component.html',
  styleUrls: ['./horizontal-user-home-menu.component.css']
})
export class HorizontalUserHomeMenuComponent {
  id!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private projetService: ObservableService) {}


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
    }
  }

}
