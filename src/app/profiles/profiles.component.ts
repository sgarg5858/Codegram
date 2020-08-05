import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../profile-info/profile.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit,OnDestroy {

  constructor(private profileService:ProfileService,private router:Router) { }
  profilesSubscription:Subscription;
  userProfiles:any[]=[];
  isLoading=true;

  ngOnInit(): void {
    this.profileService.getProfiles();
    this.profilesSubscription=this.profileService.profilesChanged.subscribe((profiles:any[])=>{
      //Firebase returns an object
      this.userProfiles=Object.values(profiles);
      this.userProfiles=this.userProfiles.filter(profile=>profile!=null);
      console.log(this.userProfiles);
      this.isLoading=false;
    })
  }


  ngOnDestroy()
  {
    if(this.profilesSubscription)
    {
      this.profilesSubscription.unsubscribe();
    }
  }
  showProfile(i)
  {
    this.profileService.selectedProfile.next(this.userProfiles[i]);
    this.router.navigate(['profile',i]);
    
  }

}
