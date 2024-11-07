import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { ChannelModel } from '../Model/ChannelModel';
import { GroupChannelService } from '../Service/group-channel.service';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { ChannelSubService } from '../Service/channel-sub.service';
import { ChannelSubModel } from '../Model/ChannelSubModel';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
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
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  constructor(private service:ChannelSubService, private dialog:MatDialog){}

  toggle = false;
  checkedIn = false;

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic')
  channelGrp = localStorage.getItem('channelGrp')
  subjectLevel = localStorage.getItem('subjectLevel')
  courseId = localStorage.getItem('courseId')
  static subscriptionFee: number; 
  
  ngOnInit():void{
    var postData={
      channelGrp: "" + this.channelGrp,
      channelSub: ""+ this.subjectLevel
    };
    // this.GetChannels(postData);
    this.GetChannels(this.courseId);
  }

  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

  ChannelDetail:any;
  dataSource:any;
  //downloadPath = 'https://localhost:7083/api/Product/download?productcode=002';

  GetChannels(courseId: any) {
      this.service.GetModules(courseId).subscribe(item=>{
        this.ChannelDetail=item
        console.log(this.ChannelDetail)
        this.dataSource=new MatTableDataSource<ChannelSubModel>(this.ChannelDetail);
        this.dataSource.paginator=this.paginator;
      });
  }

  // displayedColumns: string[] = ['channelId', 'name'];
  displayedColumns: string[] = ['name'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate(){
  }

  FunctionModuleId(id:any){
    localStorage.setItem("moduleId",id);
  }
  FunctionTeacherId(id:any){
    localStorage.setItem("teacherId",id);
  }

  FunctionUpdateSubscription(fee:any){
    LandingPageComponent.subscriptionFee = fee;
    localStorage.setItem('subscriptionFee',fee);
    console.log(LandingPageComponent.subscriptionFee)
  }

}
