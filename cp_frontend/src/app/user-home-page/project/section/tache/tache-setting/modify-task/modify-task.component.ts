import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Tache from 'src/interface/Tache';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css']
})
export class ModifyTaskComponent implements OnInit{


  tache!:Tache;
  @Input() tacheId: string = '';

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: string){}

  ngOnInit(): void {
    this.tacheId = this.data;
    this.httpClient.get<Tache>(`http://localhost:8080/taches/tache?id=${this.tacheId}`).
    subscribe((tacheData: Tache) => {
      this.tache = tacheData; 
    });
  }



}
