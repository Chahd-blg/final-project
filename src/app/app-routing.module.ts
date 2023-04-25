import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SignupAssistComponent } from './components/signup-assist/signup-assist.component';
import { LoginComponent } from './components/login/login.component';
import { AssistancesComponent } from './components/assistances/assistances.component';
import { AssitantInfoComponent } from './components/assitant-info/assitant-info.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {path:"userSubscription",component:SignupComponent},
  {path:"assistSubscription",component:SignupAssistComponent},
  {path:"adminSubscription",component:SignupAdminComponent},

  {path:"login",component:LoginComponent},
  
  {path:"",component:HomeComponent},
  {path:"allAssistances",component:AssistancesComponent},
  {path:"dashboardAdmin",component:DashboardAdminComponent},
  {path:"assistInfo/:id",component:AssitantInfoComponent},
  {path:"userProfile",component:ProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
