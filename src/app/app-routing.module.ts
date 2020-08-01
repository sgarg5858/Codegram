import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'profile',component:ProfileInfoComponent},
  // {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
