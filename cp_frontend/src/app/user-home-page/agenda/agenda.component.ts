import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as FullCalendar from 'fullcalendar'; // Importez FullCalendar correctement

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements AfterViewInit {
  @ViewChild('calendar') calendarRef!: ElementRef;

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

    calendar.render();
  }
}
