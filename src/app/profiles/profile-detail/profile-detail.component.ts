import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/profile-info/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit,OnDestroy {

  constructor(private profileService:ProfileService) { }
  userProfile:any=null;
  selectedProfileSubscription:Subscription;
  ngOnInit(): void {
    this.selectedProfileSubscription=this.profileService.selectedProfile.subscribe((profile)=>{
      this.userProfile=profile;
      console.log(this.userProfile);
    })
  }
  ngOnDestroy()
  {
    if(this.selectedProfileSubscription)
    {
      this.selectedProfileSubscription.unsubscribe();
    }
  }

}
