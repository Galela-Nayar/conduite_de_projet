import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import Project from 'src/interface/Project';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements AfterViewInit {
  @ViewChild('calendar') calendarRef!: ElementRef;
  id: string = '';
  projects_id: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
    }
  }

  ngAfterViewInit() {
    const calendarElement = this.calendarRef.nativeElement;

    const calendar = new Calendar(calendarElement, {
      plugins: [dayGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
      },
      initialDate: new Date(),
      initialView: 'dayGridMonth',
      editable: true,
    });

    calendar.render();

    this.http
      .get<any[]>(`http://localhost:8080/utilisateurs/projects?id=${this.id}`)
      .subscribe((projects_id) => {
        if (projects_id != null) this.projects_id = projects_id;
        this.projects_id.forEach((project) => {
          this.http
            .get<Project>(`http://localhost:8080/projets/projet?id=${project}`)
            .subscribe((projectData: Project) => {
              if (projectData != null) {
                const event = {
                  title: 'Projet: ' + projectData.nom,
                  start: new Date(projectData.dateCreation),
                  end: new Date(projectData.dateButtoire),
                  allDay: false,
                  color: 'green',
                };
                calendar.addEvent(event);
                projectData.taches.forEach((tacheData) => {
                  const event_2 = {
                    title: 'tache: ' + tacheData.nom,
                    end: new Date(tacheData.dateLimite),
                    allDay: false,
                    color: 'yellow',
                  };
                  calendar.addEvent(event_2);
                });
              }
            });
        });
      });
  }
}
