import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/interface/Project';
import Utilisateur from 'src/interface/Utilisateur';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projet-parametres',
  templateUrl: './projet-parametres.component.html',
  styleUrls: ['./projet-parametres.component.css']
})
export class ProjetParametresComponent {
  dateForm!: FormGroup;
  descriptionForm!: FormGroup;
  success: boolean = false;

  id: string | null | undefined = null;
  projectId: string | null = null;

  project!: Project;
  createur:Utilisateur | null = null;
  fields: { key: string, label: string, value: string, saved: boolean }[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id');
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    console.log("projectId : " + this.projectId)
    this.http.get<Project>(`http://localhost:8080/projets/projet?id=${this.projectId}`).subscribe((data: Project) => {
      this.project = data;
      function dateValidator(control: FormControl): { [s: string]: boolean } | null {
        const date = control.value;
        if (!date) {
          return null;
        }
        if (!(date instanceof Date)) {
          return { 'invalidDate': true };
        }
        return null;
      }
      
      this.dateForm = new FormGroup({
        'datePicker': new FormControl(this.project.dateButtoire, [Validators.required, dateValidator])
      });
      this.descriptionForm = new FormGroup({
        'description': new FormControl(this.project.description, Validators.required)
      });
      this.fields = [
        { key: 'nom', label: 'Nom du projet', value: '', saved: false },
        { key: 'date', label: 'Date buttoire', value: '', saved: false},
        { key: 'description', label: 'Description', value: '', saved: false}
      ];
      this.dateForm.get('datePicker')?.valueChanges.subscribe(() => {
        this.fields[1].saved = false;
        this.cdr.detectChanges();
      });
      this.descriptionForm.get('description')?.valueChanges.subscribe(() => {
        this.fields[2].saved = false;
        this.cdr.detectChanges();
      });
      this.http.get<Utilisateur>(`http://localhost:8080/utilisateurs/user?id=${this.project.createur}`).subscribe((data: Utilisateur) => {
        this.createur = data;
      });
    });
  }

  getUserProperty(key: string): any {
    if(this.project)
      return this.project[key];  
  }

  save(field: { key: any; value: any; saved: boolean; }): void {
    console.log(`http://localhost:8080/projets/set_${field.key}?id=${this.projectId}&param=${field.value}`)
    this.http.get(`http://localhost:8080/projets/set_${field.key}?id=${this.projectId}&param=${field.value}`, {responseType: 'text'}).subscribe((data: string) => {
      if (data.toString().startsWith('ok')) {
        field.saved = true;
      }
    });
  }

  saveDate(): void{
    console.log(`http://localhost:8080/projets/set_date?id=${this.projectId}&day=${this.getFormattedDay(this.dateForm.get('datePicker')?.getRawValue())}&month=${this.getFormattedMonth(this.dateForm.get('datePicker')?.getRawValue())}&year=${this.getFormattedYear(this.dateForm.get('datePicker')?.getRawValue())}`)
    this.http.get(`http://localhost:8080/projets/set_date?id=${this.projectId}&day=${this.getFormattedDay(this.dateForm.get('datePicker')?.getRawValue())}&month=${this.getFormattedMonth(this.dateForm.get('datePicker')?.getRawValue())}&year=${this.getFormattedYear(this.dateForm.get('datePicker')?.getRawValue())}`, {responseType: 'text'}).subscribe((data: string) => {
      if (data.toString().startsWith('ok')) {
        this.fields[1].saved = true;
      }
    });
  }

  saveDescription(): void{
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(`http://localhost:8080/projets/set_description?id=${this.projectId}`,this.descriptionForm.get('description')?.getRawValue(), {responseType: 'text'}).subscribe((data) => {
      if (data.toString().startsWith('ok')) {
        this.fields[2].saved = true;
      }
    });
  }

  closeProject() {
    this.http.get(`http://localhost:8080/projets/delete?id=${this.projectId}`, {responseType: 'text'}).subscribe((data) =>{
      if(data.toString().startsWith('ok')){
        this.router.navigate([`${this.id}/home`])
      }
    })
  }

  getFormattedDate(date: string | Date): string {
    date = new Date(date);
    return `${date.getDate()}/${this.getFormattedMonth(date)}/${date.getFullYear()}`;
  }

  getFormattedDay(date: string | Date): string {
    date = new Date(date);
    console.log('day : ' + date.getDate())
    return `${date.getDate()}`;
  }

  getFormattedMonth(date: string | Date): string {
    date = new Date(date);
    
    const monthDict = {
      'Jan': 1,
      'Feb': 2,
      'Mar': 3,
      'Apr': 4,
      'May': 5,
      'Jun': 6,
      'Jul': 7,
      'Aug': 8,
      'Sep': 9,
      'Oct': 10,
      'Nov': 11,
      'Dec': 12
    };

    type MonthKey = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
    let month: MonthKey = date.toString().split(' ')[1] as MonthKey;
    return `${monthDict[month]}`;
  }

  getFormattedYear(date: string | Date): string {
    date = new Date(date);
    return `${date.getFullYear()}`;
  }
}
