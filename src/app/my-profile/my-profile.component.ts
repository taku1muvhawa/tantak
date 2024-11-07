import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalpopupProPicComponent } from '../modalpopup-pro-pic/modalpopup-pro-pic.component';
import { UserMasterService } from '../Service/user-master.service';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SideBarAdminComponent,
    SideBarComponent,
    TopNavComponent,
    FooterComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  constructor(private service2:UserMasterService, private dialog:MatDialog){}

  toggle = false;

  ngOnInit(): void {  
    // console.log(this.editdata);
    // this.GetExistdata(this.code)
  }

  code = localStorage.getItem('code');
  username = localStorage.getItem('name');
  surname = localStorage.getItem('surname');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  dob = localStorage.getItem('dob');
  gender = localStorage.getItem('gender');
  city = localStorage.getItem('city');
  school = localStorage.getItem('school');
  level = localStorage.getItem('level');
  shortDate: string|undefined;

//   role = localStorage.getItem('role')
//   code = localStorage.getItem('code');
//   username:any;
//   email:any;
//   profilePic:any;
//   dob:any;
//   gender:any;
//   city:any;
//   school:any;
//   level:any;
//   shortDate: string|undefined;

// editdata: any;

// updateform = new FormGroup({
//   code: new FormControl(),
//   name: new FormControl(""),
//   email: new FormControl("",Validators.compose([Validators.required,Validators.email])),
//   password: new FormControl(""),
//   isActive: new FormControl(),
//   role: new FormControl("", Validators.required),
//   profilePic: new FormControl(""),
//   gender: new FormControl(""),
//   school: new FormControl(""),
//   city: new FormControl(""),
//   dob: new FormControl(""),
//   slevel: new FormControl(""),

// })

FunctionUpdate(){

  let popup= this.dialog.open(ModalpopupProPicComponent,{
    width: '450px',
    //height:'400px',
    exitAnimationDuration:'1000ms',
    enterAnimationDuration:'500ms',
  })
  // popup.afterClosed().subscribe(item=>{
  //   this.GetAllUser();
  // });

}

// GetExistdata(userid:any) {
//   this.service2.GetUserbyId(1).subscribe(item => {
//     this.editdata = item;
//    console.log(this.editdata);
//     if(this.editdata!=null){
//     // this.updateform.setValue({userid:this.editdata.userid,role:this.editdata.role,isActive:this.editdata.isActive});
//     this.updateform.setValue({
//       code: this.editdata.Code,
//       name: this.editdata.Name,
//       email: this.editdata.email,
//       password: this.editdata.password,
//       isActive: this.editdata.isActive,
//       role: this.editdata.role,
//       profilePic: this.editdata.profilePic,
//       gender: this.editdata.gender,
//       school: this.editdata.school,
//       city: this.editdata.city,
//       dob: this.editdata.dob,
//       slevel: this.editdata.slevel,

//     })
//     }
//     this.username = this.editdata.name;
//     this.email = this.editdata.email;
//     this.profilePic = this.editdata.profilePic;
//     this.dob = this.editdata.dob;
//     this.gender = this.editdata.gender;
//     this.city = this.editdata.city;
//     this.school = this.editdata.school;
//     this.level = this.editdata.slevel;
//   });
// }
}
