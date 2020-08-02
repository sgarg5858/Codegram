import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators'
@Injectable({
    providedIn:'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService:AuthService,private router:Router){}
    //must return boolean
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): 
    boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree
    {
        return this.authService.userDataChanged.pipe(map(user=>{
            const isAuth= user ?true:false;
            if(isAuth)
            {
                return true;
            }
            else{
                return this.router.createUrlTree(['/login']);
            }
        }));
    }
}