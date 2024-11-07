import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AssessmentService } from '../Service/assessment.service';
import { MainService } from '../Service/main.service';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { AssessmentModel } from '../Model/AssessmentModel';
import { UploadAssignmentComponent } from '../upload-assignment/upload-assignment.component';
import { ModalpopupTwoComponent } from '../modalpopup-two/modalpopup-two.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from '../Components/top-nav/top-nav.component';
import { FooterComponent } from '../Components/footer/footer.component';


@Component({
  selector: 'app-assignments',
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
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  constructor(private service:MainService, private dialog:MatDialog){}

  toggle = false;
  checkedIn = false;

  userID = localStorage.getItem('user_id');
  moduleID = localStorage.getItem('moduleId');

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelName = localStorage.getItem('channelName');
  channelGrp = localStorage.getItem('channelGrp');
  channelSub = localStorage.getItem('subjectLevel');
  channelVEmail = localStorage.getItem('channelVEmail');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');
  isChannelAdmin = false;

  shortDate: string|undefined;

  myAssessmentDetail:any;

  ngOnInit(): void {
    this.GetAllAssessments();
    this.FunctionCheckAdmin();
  }
  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

  AssessmentDetail:any;
  dataSource:any;

  GetAllAssessments(){
    this.service.GetAssignments(this.moduleID).subscribe(item=>{
      this.dataSource=item
      console.log(this.dataSource)
      // this.GetMyAssessments();
      // this.dataSource=new MatTableDataSource<AssessmentModel>(this.myAssessmentDetail);
      this.dataSource.paginator=this.paginator;
    });
  }
  GetMyAssessments(){
    this.myAssessmentDetail = this.AssessmentDetail.filter((s: { ChannelName: string; ChannelGrp: string; ChannelSub: string;}) =>
       s.ChannelName === this.channelName && s.ChannelGrp === this.channelGrp && s.ChannelSub === this.channelSub);
    console.log("transactions "+ this.myAssessmentDetail);
   }

  displayedColumns: string[] = ['assNo', 'date', 'type', 'topic','action', 'delete'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate(){
  }

  FunctionDeleteAssigment(code:any){
    alertify.confirm("Remove Assignment", "Do you want to remove this Assessment?",()=>{
      this.service.DeleteAssignment(code).subscribe(item=>{
        this.GetAllAssessments();
        alertify.success("Removed Successfully");
    })

    },function(){});
  }

  FunctionPopup(){
    let popup= this.dialog.open(UploadAssignmentComponent,{
      width: '450px',
      //height:'400px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'500ms',
    })
  }

  FunctionAddAssignment(){

  }

  FunctionCheckAdmin(){
    if(this.channelVEmail === this.email)
    {
      this.isChannelAdmin = true;
    }else if(this.channelGrpAdmin === this.email)
    {
      this.isChannelAdmin = true;
    }else{
      this.isChannelAdmin = false;
    }
  }
  
  FunctionPopupUpload(){
    let popup= this.dialog.open(ModalpopupTwoComponent,{
      width: '450px',
      //height:'400px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'500ms',
    })
  }
}
