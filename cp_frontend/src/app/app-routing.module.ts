import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './home-page/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { CreateProjectComponent } from './user-home-page/create-project/create-project.component';
import { ProjectComponent } from './user-home-page/project/project.component';
import { UserHomeComponent } from './user-home-page/user-home/user-home.component';
import { CreateSectionComponent } from './user-home-page/create-section/create-section.component';
import { SectionComponent } from './user-home-page/project/section/section.component';
import { TacheComponent } from './user-home-page/project/section/tache/tache.component';
import { CreateTaskComponent } from './user-home-page/create-task/create-task.component';
import { LogInComponent } from './home-page/log-in/log-in.component';




const routes: Routes = [
  { path: '', component: HomePageComponent, 
    children:[
      { path: 'register', component: RegisterComponent },
      { path: 'log-in', component: LogInComponent},
      { path: '', redirectTo:'log-in', pathMatch:'full'}
    ] },
  { path: ':id', 
    component: UserHomePageComponent,
    children: [
      { path: 'home', component: UserHomeComponent},
      { path: 'project/:projectId', component: ProjectComponent,
        children:[
          { path: 'create-section/:x/:y', component: CreateSectionComponent},
          { path: ':sectionId', component: SectionComponent,
            children:[
              { path: ':tacheId', component: TacheComponent},
              { path: 'create-tache/:x/:y', component: CreateTaskComponent}
            ]
          }
        ] 
      },
      { path: 'create-project', component: CreateProjectComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
