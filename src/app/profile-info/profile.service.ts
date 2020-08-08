import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,private authService:AuthService,private router:Router) { }
  userSubscription:Subscription;
  profilesChanged=new BehaviorSubject<any>(null);
  public profiles:any=null;
  userProfile=new BehaviorSubject<any>(null);
  selectedProfile=new BehaviorSubject<any>(null);
  

  saveProfileData(data)
  {
    let token=this.authService.getUserToken();
     return this.http.post(`https://devgram-e39dd.firebaseio.com/users.json?auth=${token}`,data);
  }

  getProfiles()
  {
    let token=this.authService.getUserToken();
   
      this.http.get(`https://devgram-e39dd.firebaseio.com/users.json?auth=${token}`).subscribe((profiles)=>{
        console.log(profiles);
        this.profiles=profiles;
        this.profilesChanged.next({...this.profiles});
      })
  }
  updateProfile(updatedProfile)
  {
    const profiles=Object.values(this.profiles);
    console.log(profiles);
    const updatedProfiles=profiles.map((profile:any)=>profile.email==updatedProfile.email?updatedProfile:profile);
    console.log(updatedProfiles);
    
    let token=this.authService.getUserToken();
    
    console.log(updatedProfiles);
     return this.http.put(`https://devgram-e39dd.firebaseio.com/users.json?auth=${token}`,updatedProfiles).
     pipe(tap(profiles=>{
      this.profiles=profiles;
      this.profilesChanged.next({...this.profiles});
     }));
  }
}
