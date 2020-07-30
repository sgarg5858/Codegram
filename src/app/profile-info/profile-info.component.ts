import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor() { }
  profileInfoForm:FormGroup;
  experiencepanelState = false;
  educationpanelState = false;
  skillpanelState = false;
  experiencePresent=[];
  educationPresent=[];
  ngOnInit(): void {
    this.profileInfoForm=new FormGroup({
      jobTitle:new FormControl('',Validators.required),
      bio:new FormControl('',Validators.required),
      experiences: new FormArray([]),
      educations:new FormArray([]),
      skills:new FormArray([])
    })
  }
  addExperience()
  {
    (<FormArray>this.profileInfoForm.controls.experiences).push(
      new FormGroup({
        company:new FormControl('',Validators.required),
        present:new FormControl(false,Validators.required),
        from:new FormControl('',Validators.required),
        to:new FormControl('',Validators.required),
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
  addEducation()
  {
    (<FormArray>this.profileInfoForm.controls.educations).push(
      new FormGroup({
        school:new FormControl('',Validators.required),
        present:new FormControl(false,Validators.required),
        from:new FormControl('',Validators.required),
        to:new FormControl('',Validators.required),
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
  }

}
