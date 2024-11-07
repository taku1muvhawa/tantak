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
import { ChannelSubService } from '../Service/channel-sub.service';
import { MatIconAnchor } from '@angular/material/button';
import { CourseOutlineService } from '../Service/course-outline.service';
import { SubscriptionService } from '../Service/subscription.service';
import { TransactionService } from '../Service/transaction.service';
import { SideBar2Component } from '../Components/side-bar2/side-bar2.component';
import { CourseOutlineModel } from '../Model/CourseOutlineModel';
import { ModalpopupTwoComponent } from '../modalpopup-two/modalpopup-two.component';
import { ModalpopupSubscribeComponent } from '../modalpopup-subscribe/modalpopup-subscribe.component';
import { UploadCourseOutlineComponent } from '../upload-course-outline/upload-course-outline.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { MainService } from '../Service/main.service';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SideBarAdminComponent,
    SideBarComponent,
    SideBar2Component,
    TopNavComponent,
    FooterComponent
  ],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private service: MainService, private route: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.GetAllCourseOutline();
  }

  userId = localStorage.getItem('user_id');
  moduleID = localStorage.getItem('moduleId');
  collegeAdmin = localStorage.getItem('collegedminId');
  courseAdmin = localStorage.getItem('courseAdminId');
  teacherId = localStorage.getItem('teacherId');

  isAdmin = false;
  isSubscribed = true;
  subState = "";
  subscriptionState = "subscribed";
  SubscriptionStatus = "True";

  dataSource: any;
  displayedColumns: string[] = ['term', 'topic', 'status'];

  FunctionCheckAdmin() {
    if (this.userId == this.courseAdmin || this.userId == this.teacherId || this.userId == this.collegeAdmin) {
      this.isAdmin = true;
    } else {
      this.subState = "Subscribe in order to access learning materials"
    }
  }

  FunctionCheckSubscription(courseId: any, userId: any) {
    this.service.CheckSubscription(courseId, userId).subscribe(response => {
      if (Object.values(response)[0] === '200') {
        this.isSubscribed = true;
      } else {
        this.isSubscribed = false;
      }
    });
  }

  GetAllCourseOutline() {
    this.service.GetLessons(this.moduleID).subscribe(item => {
      this.dataSource = item
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  FunctionPopup() {
    localStorage.setItem('subscriptionStatus', this.SubscriptionStatus);
    let popup = this.dialog.open(ModalpopupTwoComponent, {
      width: '450px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
  }

  RedirectToAssignments() {
    localStorage.setItem('btnClick', "assignments")
    if (this.SubscriptionStatus == 'True') {
      this.route.navigate(["/assignments"]);
    } else {
      this.FunctionPopup();
    }
  }

  RedirectToEbooks() {
    localStorage.setItem('btnClick', "books")
    if (this.SubscriptionStatus == 'True') {
      this.route.navigate(["/books"]);
    } else {
      this.FunctionPopup();
    }
  }
  RedirectToReports() {
    localStorage.setItem('btnClick', "reports")
    if (this.SubscriptionStatus == 'True') {
      this.route.navigate(["/reports"]);
    } else {
      this.FunctionPopup();
    }
  }
  RedirectToFeedback() {
    localStorage.setItem('btnClick', "feedback")
    if (this.SubscriptionStatus == 'True') {
      this.route.navigate(["/feedback"]);
    } else {
      this.FunctionPopup();
    }
  }


  RedirectToLearningMaterial() {
    localStorage.setItem('btnClick', "LM")
    if (this.SubscriptionStatus === 'True') {
      this.route.navigate(["/lessons"]);
    } else {
      this.FunctionPopup();
    }
  }

}
