import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../profile-info/profile.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { pairwise } from 'rxjs/operators';

// 

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit,OnDestroy {

  constructor(private profileService:ProfileService,private router:Router,private changeDetectorRef: ChangeDetectorRef) { }
  profilesSubscription:Subscription;
  userProfiles:any[]=[];
  isLoading=true;
  searchForm:FormGroup;
  filteredProfiles:any[]=[];

  ngOnInit(): void {
    this.searchForm=new FormGroup({
      searchProfiles:new FormControl('')
    })
   if(this.profileService.profiles==null)
   {
    this.profileService.getProfiles();
   }
    this.profilesSubscription=this.profileService.profilesChanged.subscribe((profiles:any[])=>{
      //Firebase returns an object
      this.userProfiles=Object.values(profiles);
      this.userProfiles=this.userProfiles.filter(profile=>profile!=null);
      console.log(this.userProfiles);
      this.filteredProfiles=this.userProfiles;
      this.isLoading=false;
      this.changesOfField();
    })
  }

  changesOfField()
  {
    this.searchForm.get('searchProfiles')
  .valueChanges
  .pipe(pairwise())
  .subscribe(([prev, next]: [any, any]) => this.filterDevelopers(next) );
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
    this.profileService.selectedProfile.next(this.filteredProfiles[i]);
    this.router.navigate(['profile',i]);
    
  }
  filterDevelopers(val)
  {
    const value=val.toLowerCase();
   this.filteredProfiles=this.userProfiles.filter(profile=>{
     return profile.name.toLowerCase().includes(value) ||  profile.location.toLowerCase().includes(value) ||  profile.jobTitle.toLowerCase().includes(value)
   })
  
  }
  

}
