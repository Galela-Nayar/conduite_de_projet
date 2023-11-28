import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-limite-calendrier',
  templateUrl: './date-limite-calendrier.component.html',
  styleUrls: ['./date-limite-calendrier.component.css']
})
export class DateLimiteCalendrierComponent {
  @Input()tacheId!: String
  selectedDate: Date;

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<DateLimiteCalendrierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {date: Date, tacheId: String}
  ) {
    this.selectedDate = data.date;
    this.tacheId = data.tacheId;
  }

  save(): void {
    this.updateDate()
    this.dialogRef.close(this.selectedDate);
  }

  updateDate() {
    // Convert the date to the format your backend expects
  
    this.http.get(`http://localhost:8080/taches/setDateLimite?tacheId=${this.tacheId}&dateLimite=${formatDate(this.selectedDate, 'dd-MM-yyyy', 'en-US')}`, {responseType: 'text',})
      .subscribe((response) => {
        // Handle response
      });
  }
}
