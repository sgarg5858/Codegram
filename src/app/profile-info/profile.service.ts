import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  userSubscription:Subscription;

  saveProfileData(data)
  {
    let token=null;
    this.userSubscription=this.authService.userDataChanged.subscribe((user:User)=>{
      
      token=user.token;
      console.log(token);

      this.http.post(`https://devgram-e39dd.firebaseio.com/users.json?auth=${token}`,data).subscribe((response)=>{
        console.log(response);
        this.cancelSubscription();
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

}
