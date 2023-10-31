import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { RefreshService } from 'src/service/RefreshService';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent{

  @Output() refreshMenus = new EventEmitter<void>();
  isRefreshing = false; // Add this line

  constructor(private refreshService: RefreshService) { }

  refreshComponents() {
    if (!this.isRefreshing) { // Add this line
      this.isRefreshing = true; // Add this line
      this.refreshService.announceRefresh();
      console.log('refresh');
      this.isRefreshing = false; // Add this line
    }
  }
}