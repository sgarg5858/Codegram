import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService) { }
  @ViewChild('sidenav')sidenav;
  isUserAuthenticated=false;
  userAuthenticationSubscription:Subscription;
  menu=true;

  ngOnInit(): void {
    
    this.userAuthenticationSubscription=this.authService.userDataChanged.subscribe((userData)=>{
      
      userData?this.isUserAuthenticated=true:this.isUserAuthenticated=false;
    
    })
  }
  toggleButton()
  {
    this.sidenav.toggle();
    this.menu=!this.menu;
  }
  closeNav()
  {
    this.sidenav.close();
     this.menu=true;
  }
  ngOnDestroy()
  {
    if(this.userAuthenticationSubscription)
    {
      this.userAuthenticationSubscription.unsubscribe();
    }
  }
  logout()
  {
    this.menu=true;
    this.authService.logout();
    this.closeNav();
  }
}
