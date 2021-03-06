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
  userEmail=null;
  profilesSubscription:Subscription;
  userProfile=null;
  userProfiles:any[];
  isLoading=true;
  isError=false

  ngOnInit(): void {
    this.isLoading=true;
    this.userEmail=(JSON.parse(localStorage.getItem('userData'))).email;
    this.profileService.getProfiles();
    this.profilesSubscription=this.profileService.profilesChanged.subscribe((profiles)=>{

     if(profiles!=null)
     {
      this.userProfiles=Object.values(profiles);
      console.log(this.userProfiles);
      this.userProfiles=this.userProfiles.filter(profile=>profile!=null);
      this.userProfile=this.userProfiles.find(profile=> profile.email==this.userEmail);
      console.log(this.userProfile);
       this.isLoading=false;
     }

    },(error)=>{
      this.isError=true;
      this.isLoading=false;
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
  onEdit()
  {
    this.profileService.userProfile.next(this.userProfile);
    this.router.navigate(['edit-profile']);
  }
}
