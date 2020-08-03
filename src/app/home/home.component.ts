import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-info/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  constructor(private router:Router,private profileService:ProfileService) { }
  userEmail:null;
  profilesSubscription:Subscription;
  userProfile=null;
  userProfiles:any[];

  ngOnInit(): void {

    this.userEmail=(JSON.parse(localStorage.getItem('userData'))).email;
    this.profileService.getProfiles();
    this.profilesSubscription=this.profileService.profilesChanged.subscribe((profiles)=>{
      this.userProfiles=Object.values(profiles);
      console.log(this.userProfiles);
      this.userProfile=this.userProfiles.filter(profile=>profile.email==this.userEmail)[0];
      console.log(this.userProfile);

    })
  }

  onCreate()
  {
    this.router.navigate(['create-profile'])
  }
  ngOnDestroy()
  {
    if(this.profilesSubscription)
    {
      this.profilesSubscription.unsubscribe();
    }
  }
}
