import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService) { }
  isUserAuthenicated=false;
  userAuthenticationSubscription:Subscription;

  ngOnInit(): void {
    
    this.userAuthenticationSubscription=this.authService.userDataChanged.subscribe((userData)=>{
      
      userData?this.isUserAuthenicated=true:this.isUserAuthenicated=false;
    
    })
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
    this.authService.logout();
  }
}
