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
import { MainService } from '../Service/main.service';
import { ReportsService } from '../Service/reports.service';
import { ReportsModel } from '../Model/ReportsModel';
import { ModalReportsPopupComponent } from '../modal-reports-popup/modal-reports-popup.component';
import { ModalReportsPopup2Component } from '../modal-reports-popup2/modal-reports-popup2.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-reports',
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
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  constructor(private service: MainService, private dialog: MatDialog) { }

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
  isChannelTeacher = false;

  ngOnInit(): void {
    this.GetAllReports();
    this.FunctionCheckAdmin();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ReportsDetail: any;
  dataSource: any;
  myReportsDetail: any;

  GetAllReports() {
    this.service.GetResults(this.moduleID, this.userID).subscribe(item => {
      this.dataSource = item
      console.log(this.dataSource)
      // if (this.isChannelAdmin || this.isChannelTeacher) {
      //   this.GetMyReports();
      //   this.dataSource = new MatTableDataSource<ReportsModel>(this.myReportsDetail);
      // }
      // else {
      //   this.GetStudentReports()
      //   this.dataSource = new MatTableDataSource<ReportsModel>(this.myReportsDetail);
      // }
      this.dataSource.paginator = this.paginator;
    });
  }


  displayedColumns: string[] = ['studentEmail', 'assignmentName', 'marks', 'percentage', 'grade', 'action'];
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
      this.GetAllReports();
    });
  }

  FunctionAddReport() {

    let popup = this.dialog.open(ModalReportsPopup2Component, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
      data: {
        channelId: 0
      }
    })
    popup.afterClosed().subscribe(item => {
      this.GetAllReports();
    });
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
    let popup = this.dialog.open(UploadNotesComponent, {
      width: '450px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
  }

  FunctionCheckAdmin() {
    if (this.channelGrpAdmin === this.email) {
      this.isChannelAdmin = true;
      console.log('ADMIN')
    } else if (this.channelGrpAdmin === this.email) {
      this.isChannelAdmin = true;
      console.log('ADMIN')
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
