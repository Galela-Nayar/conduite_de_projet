import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './home-page/register/register.component';
import { LogAppComponent } from './log-app/log-app.component';
import { LateralUserHomeMenuComponent } from './user-home-page/lateral-user-home-menu/lateral-user-home-menu.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { HorizontalUserHomeMenuComponent } from './user-home-page/horizontal-user-home-menu/horizontal-user-home-menu.component';
import { ProjectComponent } from './user-home-page/project/project.component';
import { CreateProjectComponent } from './user-home-page/create-project/create-project.component';
import { UserHomeComponent } from './user-home-page/user-home/user-home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateSectionComponent } from './user-home-page/create-section/create-section.component';
import { SectionComponent } from './user-home-page/project/section/section.component';
import { TacheComponent } from './user-home-page/project/section/tache/tache.component';
import { CreateTaskComponent } from './user-home-page/create-task/create-task.component';
import { LogInComponent } from './home-page/log-in/log-in.component';
import { SectionSettingComponent } from './user-home-page/project/section/section-setting/section-setting.component';
import { TacheSettingComponent } from './user-home-page/project/section/tache/tache-setting/tache-setting.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';


import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ModifySectionComponent } from './user-home-page/project/section/section-setting/modify-section/modify-section.component';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { UserSettingComponent } from './user-home-page/user-setting/user-setting.component';
import { ProjectSettingComponent } from './user-home-page/lateral-user-home-menu/project-setting/project-setting.component';
import { ProjetParametresComponent } from './user-home-page/projet-parametres/projet-parametres.component';
import { ModeAffichageComponent } from './user-home-page/project/mode-affichage/mode-affichage.component';
import { CreateEtatComponent } from './user-home-page/create-etat/create-etat.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterComponent,
    LogAppComponent,
    LateralUserHomeMenuComponent,
    UserHomePageComponent,
    HorizontalUserHomeMenuComponent,
    ProjectComponent,
    CreateProjectComponent,
    UserHomeComponent,
    CreateSectionComponent,
    SectionComponent,
    TacheComponent,
    CreateTaskComponent,
    LogInComponent,
    SectionSettingComponent,
    TacheSettingComponent,
    ModifySectionComponent,
    UserSettingComponent,
    ProjectSettingComponent,
    ProjetParametresComponent,
    ModeAffichageComponent,
    CreateEtatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
