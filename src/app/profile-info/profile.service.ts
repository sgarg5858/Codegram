import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { Subscription, Subject } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,private authService:AuthService,private router:Router) { }
  userSubscription:Subscription;
  profilesChanged=new Subject<any>();
  profiles:any;

  saveProfileData(data)
  {
    let token=null;
     this.authService.userDataChanged.pipe(take(1)).subscribe((user:User)=>{
      
      token=user.token;
      console.log(token);
      this.http.post(`https://devgram-e39dd.firebaseio.com/users.json?auth=${token}`,data).subscribe((response)=>{
        console.log(response);
        // this.cancelSubscription();
        this.router.navigate(['profile']);
      })
    })
  }

  cancelSubscription()
  {
    if(this.userSubscription)
    {
      this.userSubscription.unsubscribe();
    }
  }
  getProfiles()
  {
    let token=null;
    this.authService.userDataChanged.pipe(take(1)).subscribe((user:User)=>{
      
      token=user.token;
      console.log(token);
      this.http.get(`https://devgram-e39dd.firebaseio.com/users.json?auth=${token}`).subscribe((profiles)=>{
        console.log(profiles);
        this.profiles=profiles;
        this.profilesChanged.next({...this.profiles});
      })
    })
  }

}
