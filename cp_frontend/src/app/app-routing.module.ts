import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { CreateProjectComponent } from './user-home-page/create-project/create-project.component';
import { ProjectComponent } from './user-home-page/project/project.component';
import { UserHomeComponent } from './user-home-page/user-home/user-home.component';




const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomePageComponent },
  { path: ':id', 
    component: UserHomePageComponent,
    children: [
      { path: 'home', component: UserHomeComponent},
      { path: 'project/:projectId', component: ProjectComponent },
      { path: 'create-project', component: CreateProjectComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
