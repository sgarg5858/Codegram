import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {ProfileService} from './profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit,OnDestroy {

  constructor(
    private profileService:ProfileService,
    private router:Router,
    private route:ActivatedRoute,
    private snackbar:MatSnackBar
    )
     { }
  profileInfoForm:FormGroup;
  experiencepanelState = false;
  educationpanelState = false;
  skillpanelState = false;
  experiencePresent=[];
  educationPresent=[];
  editMode=false;
  userProfileSubscription:Subscription;
  userProfile:any;
  updateProfileSubscription:Subscription;
  updateLoading=false;
  updateError=false;

  ngOnInit(): void {

    if(window.location.href)
    {
      if(window.location.href.split('/')[3]==='edit-profile')
      {
        this.editMode=true;
      }
    }
    if(this.editMode)
    {
      this.userProfileSubscription=this.profileService.userProfile.subscribe((profile)=>{
        this.userProfile=profile;
        this.initForm();
      })
    }
    else
    {
      this.initForm();
    }

  }
  initForm()
  {
    if(this.userProfile)
    {

      this.profileInfoForm=new FormGroup({
      name:new FormControl(this.userProfile.name,[Validators.required]),
      location:new FormControl(this.userProfile.location,[Validators.required]),
      githubName:new FormControl(this.userProfile.githubName,[Validators.required]),
      email:new FormControl((this.userProfile.email)),
      jobTitle:new FormControl(this.userProfile.jobTitle,Validators.required),
      experiences: new FormArray([]),
      educations:new FormArray([]),
      skills:new FormArray([])
      })

     if(this.userProfile.experiences)
     {
       this.experiencepanelState=true;
      for(let experience of this.userProfile.experiences)
      {
        (<FormArray>this.profileInfoForm.controls.experiences).push(
          new FormGroup({
            company:new FormControl(experience.company,Validators.required),
            present:new FormControl(experience.present),
            from:new FormControl(experience.from,Validators.required),
            to:new FormControl(experience.to),
            jobTitle:new FormControl(experience.jobTitle,Validators.required)
          })
        )
      }
     }
     if(this.userProfile.educations)
     {
       this.educationpanelState=true;
      for(let education of this.userProfile.educations)
      {
        (<FormArray>this.profileInfoForm.controls.educations).push(
          new FormGroup({
            school:new FormControl(education.school,Validators.required),
            present:new FormControl(education.present),
            from:new FormControl(education.from,Validators.required),
            to:new FormControl(education.to),
            degree:new FormControl(education.degree,Validators.required)
          })
        )
      }
     }
     if(this.userProfile.skills)
     {
       this.skillpanelState=true;
      for(let skill of this.userProfile.skills)
      {
        (<FormArray>this.profileInfoForm.controls.skills).push(
          new FormGroup({
            skill:new FormControl(skill.skill,Validators.required),
           
          })
        )
      }
     }
    }
    else{
      this.profileInfoForm=new FormGroup({
        name:new FormControl('',[Validators.required]),
        location:new FormControl('',[Validators.required]),
        githubName:new FormControl('',[Validators.required]),
        email:new FormControl((JSON.parse(localStorage.getItem('userData')).email)),
        jobTitle:new FormControl('',Validators.required),
        experiences: new FormArray([]),
        educations:new FormArray([]),
        skills:new FormArray([])
      })
    }

    
  }
  addExperience()
  {
    (<FormArray>this.profileInfoForm.controls.experiences).push(
      new FormGroup({
        company:new FormControl('',Validators.required),
        present:new FormControl(false),
        from:new FormControl('',Validators.required),
        to:new FormControl(''),
        jobTitle:new FormControl('',Validators.required)
      })
    )
    this.experiencePresent.push(false);
  }
  deleteExperience(index:number)
  {
    (<FormArray>this.profileInfoForm.controls.experiences).removeAt(index);
    this.experiencePresent.splice(index,1);
  }
 
  togglePresentThingForExperience(index)
  {
    console.log(index);
    console.log("called");
    this.experiencePresent[index] = !this.experiencePresent[index] ;
    console.log(this.experiencePresent);
  }
  getExperienceControls()
  {
    return  (<FormArray>this.profileInfoForm.controls.experiences).controls;
  }
  deleteAllExperiences()
  {
    (<FormArray>this.profileInfoForm.controls.experiences).clear();
  }
  addEducation()
  {
    (<FormArray>this.profileInfoForm.controls.educations).push(
      new FormGroup({
        school:new FormControl('',Validators.required),
        present:new FormControl(false),
        from:new FormControl('',Validators.required),
        to:new FormControl(''),
        degree:new FormControl('',Validators.required)
      })
    )
    this.experiencePresent.push(false);
  }
  deleteEducation(index:number)
  {
    (<FormArray>this.profileInfoForm.controls.educations).removeAt(index);
    this.experiencePresent.splice(index,1);
  }
 
  togglePresentThingForEducation(index)
  {
    console.log(index);
    console.log("called");
    this.educationPresent[index] = !this.educationPresent[index] ;
    console.log(this.experiencePresent);
  }
  getEducationControls()
  {
    return  (<FormArray>this.profileInfoForm.controls.educations).controls;
  }
  addSkill()
  {
    (<FormArray>this.profileInfoForm.controls.skills).push(
      new FormGroup({
        skill:new FormControl('',Validators.required)
      })
    )
    this.experiencePresent.push(false);
  }
  deleteSkill(index:number)
  {
    (<FormArray>this.profileInfoForm.controls.skills).removeAt(index);
    this.experiencePresent.splice(index,1);
  }
 
  getSkillControls()
  {
    return  (<FormArray>this.profileInfoForm.controls.skills).controls;
  }

  onSave()
  {
    console.log(this.profileInfoForm.value);
    if(!this.editMode)
    {
      this.profileService.saveProfileData(this.profileInfoForm.value);
    }else
    {
      this.updateError=false;
      this.updateLoading=true;
     this.updateProfileSubscription= this.profileService.updateProfile(this.profileInfoForm.value).subscribe((profiles)=>{
     this.updateLoading=false;
      console.log(profiles);
      this.router.navigate(['profile']);
      this.snackbar.openFromComponent(CustomSnackbarComponent,{
        data:'Profile updated successfully.',
        duration:3000
      })
    },(error)=>{
      this.updateLoading=false;
      this.updateError=true;
      console.log(error);
    })
    }

  }
  ngOnDestroy()
  {
    if(this.updateProfileSubscription)
    {
      this.updateProfileSubscription.unsubscribe();
    }
    if(this.userProfileSubscription)
    {
      this.userProfileSubscription.unsubscribe();
    }
  }

}
