import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http' 
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import {ProfileInfoComponent} from './profile-info/profile-info.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CustomNavbarComponent } from './custom-navbar/custom-navbar.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { HomeComponent } from './home/home.component'
import {AvatarModule} from 'ngx-avatar';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileInfoComponent,
    LoginComponent,
    SignUpComponent,
    CustomNavbarComponent,
    ForgotPasswordComponent,
    ProfilesComponent,
    HomeComponent,
    CustomSnackbarComponent,
    ProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,
    MatCardModule,MatDialogModule,MatExpansionModule,MatPaginatorModule,MatListModule,
    MatSidenavModule,MatSlideToggleModule,MatSnackBarModule,HttpClientModule,MatToolbarModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
