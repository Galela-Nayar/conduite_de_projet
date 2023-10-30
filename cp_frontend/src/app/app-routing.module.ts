import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';




const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomePageComponent },
  { path: ':id/home', component: UserHomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
