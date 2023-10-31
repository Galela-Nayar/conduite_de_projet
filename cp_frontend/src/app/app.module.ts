import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
