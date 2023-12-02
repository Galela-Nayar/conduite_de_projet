import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../equipe.service';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-equipe-tache',
  templateUrl: './equipe-tache.component.html',
  styleUrls: ['./equipe-tache.component.css']
})
export class EquipeTacheComponent implements OnInit{
  equipes: any[] = [];
  selectedEquipeId: string = '';
  projetId: any;
  tacheId: any;
  id: string='';


  constructor(private equipeService: EquipeService, private http: HttpClient,private route:ActivatedRoute) {}
  
  
  

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.id = id;
    this.loadEquipes();

  }

  loadEquipes() {
  
    this.equipeService.getAllEquipes().subscribe(
      (data) => {
        this.equipes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des équipes', error);
      }
    );
  }

}
