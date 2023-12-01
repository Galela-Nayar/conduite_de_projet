import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableService } from 'src/app/observable/observable-projet.service';
import Utilisateur from '../../../interface/Utilisateur';
import Notification from '../../../interface/Notification';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horizontal-user-home-menu',
  templateUrl: './horizontal-user-home-menu.component.html',
  styleUrls: ['./horizontal-user-home-menu.component.css'],
})
export class HorizontalUserHomeMenuComponent {
  id!: string;
  user!: Utilisateur;
  imageSrc!: any;
  notifications!: Notification[];
  notificationSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private observableService: ObservableService,
    private observerService: ObservableService,

    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
    }
    this.notificationSubscription = this.observableService
      .getObservableTask()
      .subscribe((response) => {
        this.http
          .get<Utilisateur>(
            `http://localhost:8080/utilisateurs/user?id=${this.id}`
          )
          .subscribe((data: Utilisateur) => {
            this.user = data;
            let objectURL =
              'data:image/jpeg;base64,' + this.user['logo_utilisateur'];
            this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.notificationSubscription = this.observableService
              .getObservableTask()
              .subscribe((response) => {
                this.http
                  .get<Notification[]>(
                    `http://localhost:8080/notifications/notifications?userId=${this.id}`
                  )
                  .subscribe((data: Notification[]) => {
                    this.notifications = data;
                  });
              });
          });
      });
  }

  deleteNotification(notifId: String) {
    this.http
      .get(
        `http://localhost:8080/utilisateurs/deleteNotification?userId=${this.id}&notificationId=${notifId}`,
        { responseType: 'text' }
      )
      .subscribe((data: String) => {
        this.updateNotification();
        this.observerService.notifyTask();
        this.cd.detectChanges();
      });
  }

  updateNotification() {
    this.notificationSubscription = this.observableService
      .getObservableTask()
      .subscribe((response) => {
        this.http
          .get<Notification[]>(
            `http://localhost:8080/notifications/notifications?userId=${this.id}`
          )
          .subscribe((data: Notification[]) => {
            this.notifications = data;
          });
      });
  }
}
