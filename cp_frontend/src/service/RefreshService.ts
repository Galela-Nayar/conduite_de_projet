import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  // Observable string sources
  private refreshAnnouncedSource = new Subject<void>();

  // Observable string streams
  refreshAnnounced$ = this.refreshAnnouncedSource.asObservable();

  // Service message commands
  announceRefresh() {
    this.refreshAnnouncedSource.next();
  }
}