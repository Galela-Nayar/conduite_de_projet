import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as FullCalendar from 'fullcalendar'; // Assurez-vous d'importer correctement FullCalendar
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Project from 'src/interface/Project';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements AfterViewInit {
  @ViewChild('calendar') calendarRef!: ElementRef;
  id: string = '';
  projects_id: any[] = [];
  projet: Project[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
    }
  }

  ngAfterViewInit() {
    const calendarElement = this.calendarRef.nativeElement;

    // Utilisez le type 'any' pour éviter les erreurs de type TypeScript
    const calendar: any = new FullCalendar.Calendar(calendarElement, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialDate: new Date(),
      editable: true,
    });

    // Rendre le calendrier
    calendar.render();
    this.http
      .get<any[]>(`http://localhost:8080/utilisateurs/projects?id=${this.id}`)
      .subscribe((projects_id) => {
        console.log(projects_id);
        if (projects_id != null) this.projects_id = projects_id;
        this.projects_id.forEach((project) => {
          this.http
            .get<Project>(`http://localhost:8080/projets/projet?id=${project}`)
            .subscribe((projectData: Project) => {
              if (projectData != null) {
                const event = {
                  title: 'Projet: ' + projectData.nom,
                  start: new Date(projectData.dateCreation), // Date de début de l'événement
                  end: new Date(projectData.dateButtoire), // Date de fin de l'événement (peut être la même que la date de début pour un événement ponctuel)
                  allDay: false, // Définir sur false pour spécifier que l'événement ne dure pas toute la journée
                };

                // Utilisez la méthode addEvent pour ajouter l'événement au calendrier
                calendar.addEvent(event);
              }
            });
        });
      });
  }
}
