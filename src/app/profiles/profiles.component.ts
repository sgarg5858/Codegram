import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../profile-info/profile.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface profile{
  educations:[],
  skills:[],
  experiences:[],
  email:string,
  githubName:string,
  location:string,
  name:string

}

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
  profilesData:profile[];
  dataSource:MatTableDataSource<profile>;
  obs: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.searchForm=new FormGroup({
      searchProfiles:new FormControl('')
    })
    this.profileService.getProfiles();
    this.profilesSubscription=this.profileService.profilesChanged.subscribe((profiles:any[])=>{
      //Firebase returns an object
      this.userProfiles=Object.values(profiles);
      this.userProfiles=this.userProfiles.filter(profile=>profile!=null);
      console.log(this.userProfiles);
      this.profilesData=this.userProfiles;
      this.dataSource=new MatTableDataSource<profile>(this.profilesData);
      // this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.isLoading=false;
      this.changesOfField();
    })
  }

  changesOfField()
  {
    this.searchForm.get('searchProfiles').valueChanges.subscribe(val => {
     this.filterDevelopers();
    });
  }

  ngOnDestroy()
  {
    if(this.profilesSubscription)
    {
      this.profilesSubscription.unsubscribe();
    }
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  showProfile(i)
  {
    this.profileService.selectedProfile.next(this.userProfiles[i]);
    this.router.navigate(['profile',i]);
    
  }
  filterDevelopers()
  {
    this.dataSource.filter=this.searchForm.value.searchProfiles.trim().toLowerCase();
    console.log(this.searchForm.value.searchProfiles);
    console.log(this.dataSource.data);
  }

}
