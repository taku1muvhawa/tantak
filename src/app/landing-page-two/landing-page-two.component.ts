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
import { AssessmentService } from '../Service/assessment.service';
import { MainService } from '../Service/main.service';
import { MatIconAnchor } from '@angular/material/button';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-landing-page-two',
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
  templateUrl: './landing-page-two.component.html',
  styleUrl: './landing-page-two.component.css'
})
export class LandingPageTwoComponent implements OnInit{
  constructor(private service:MainService, private dialog:MatDialog){}

  collegeId = localStorage.getItem('collegeId')
  
  ngOnInit():void{
    // var postData={
    //   channelGrp: "" + this.channelGrp
    // };
    this.GetChannels(this.collegeId);
  }

  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

  ChannelDetail:any;
  dataSource:any;

  GetChannels(id: any) {
      this.service.GetCourses(id).subscribe(item=>{
        this.ChannelDetail=item
        console.log(this.ChannelDetail)
        this.dataSource=new MatTableDataSource<ChannelModel>(this.ChannelDetail);
        this.dataSource.paginator=this.paginator;
      });
  }

  displayedColumns: string[] = ['channelId', 'name'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate(){
  }

  FunctionSetCourseDetails(id:any, adminId:any){
    localStorage.setItem("courseId",id);
    localStorage.setItem("courseAdminId",adminId);
  }

}
