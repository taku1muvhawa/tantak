import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { UploadAssignmentComponent } from '../upload-assignment/upload-assignment.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from '../Components/top-nav/top-nav.component';
import { NotesService } from '../Service/notes.service';
import { NotesModel } from '../Model/NotesModel';
import { UploadNotesComponent } from '../upload-notes/upload-notes.component';
import { ReportsService } from '../Service/reports.service';
import { ReportsModel } from '../Model/ReportsModel';
import { MainService } from '../Service/main.service';
import { ModalReportsPopupComponent } from '../modal-reports-popup/modal-reports-popup.component';
import { ModalReportsPopup2Component } from '../modal-reports-popup2/modal-reports-popup2.component';
import { FeedbackModel } from '../Model/FeedbackModel';
import { ModalPopupSubmitAssignmentComponent } from '../modal-popup-submit-assignment/modal-popup-submit-assignment.component';
import { ModalPopupSubmitMarkedComponent } from '../modal-popup-submit-marked/modal-popup-submit-marked.component';
import { FeedbackService } from '../Service/feedback.service';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-feedback',
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
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  constructor(private service: MainService, private dialog: MatDialog) { }

  toggle = false;
  isAdmin = false;
  checkedIn = false;

  shortDate: string|undefined;

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelName = localStorage.getItem('channelName');
  channelGrp = localStorage.getItem('channelGrp');
  channelSub = localStorage.getItem('subjectLevel');
  channelVEmail = localStorage.getItem('channelVEmail');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');
  isChannelAdmin = false;
  isChannelTeacher = false;
  displayDelete = false;

  userID = localStorage.getItem('user_id');
  moduleID = localStorage.getItem('moduleId');

  ngOnInit(): void {
    this.GetSubmittedAssignments();
    this.GetMarkedAssignments();
    this.FunctionCheckAdmin();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  FeedbackDetail: any;
  dataSource: any;
  dataSource2: any;


  GetSubmittedAssignments() {
    this.service.GetSubmittedAssignments( this.moduleID, this.userID ).subscribe(item => {
      this.dataSource2 = item
      console.log(this.dataSource2)
      this.dataSource2.paginator = this.paginator;
    });
  }

  GetMarkedAssignments() {
    this.service.GetMarkedAssignments(this.moduleID, this.userID).subscribe(item => {
      this.dataSource = item
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
    });
  }



  displayedColumns: string[] = ['studentEmail', 'assignmentName', 'date', 'studentFile', 'teacherFile', 'delete'];
  //dataSource = ELEMENT_DATA;

  FunctionUpdate(code: any) {

    let popup = this.dialog.open(ModalReportsPopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
      data: {
        channelId: code
      }
    })
    popup.afterClosed().subscribe(item => {
      this.GetSubmittedAssignments();
    });
  }

  FunctionDelete(code: any) {
    alertify.confirm("Remove Assignment", "Do you want to remove this Assessment Feedback?", () => {
      this.service.DeleteFeedback(code).subscribe(item => {
        this.GetSubmittedAssignments();
        alertify.success("Removed Successfully");
      })

    }, function () { });
  }


  FunctionPopup() {
    let popup = this.dialog.open(UploadAssignmentComponent, {
      width: '450px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
  }
  FunctionPopup2() {
    let popup = this.dialog.open(ModalPopupSubmitAssignmentComponent, {
      width: '450px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
  }

  FunctionPopup3() {
    let popup = this.dialog.open(ModalPopupSubmitMarkedComponent, {
      width: '450px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
  }

  FunctionCheckAdmin() {
    if (this.channelGrpAdmin === this.email) {
      this.isChannelAdmin = true;
    } else if (this.channelGrpAdmin === this.email) {
      this.isChannelAdmin = true;
    } else {
      this.isChannelAdmin = false;
    }
  }

  FunctionCheckTeacher() {
    if (this.channelVEmail === this.email) {
      this.isChannelTeacher = true;
    }
  }
}
