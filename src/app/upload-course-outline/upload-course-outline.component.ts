import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelModel } from '../Model/ChannelModel';
import { GroupChannelService } from '../Service/group-channel.service';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { AssessmentService } from '../Service/assessment.service';
import { ChannelSubService } from '../Service/channel-sub.service';
import { MatIcon } from '@angular/material/icon'; // Corrected import
import { UploadLMComponent } from '../upload-lm/upload-lm.component';
import { UserMasterService } from '../Service/user-master.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SubscriptionService } from '../Service/subscription.service';
import { SubscriptionModel } from '../Model/SubscriptionModel';
import { TransactionModel } from '../Model/TransactionModel';
import { TransactionService } from '../Service/transaction.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { CourseOutlineService } from '../Service/course-outline.service';

@Component({
  selector: 'app-upload-course-outline',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload-course-outline.component.html',
  styleUrls: ['./upload-course-outline.component.css'] // Corrected to styleUrls
})
export class UploadCourseOutlineComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private service: CourseOutlineService,
    private service2: UserMasterService,
    private route: Router,
    private ref: MatDialogRef<UploadCourseOutlineComponent>
  ) {}

  username = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelName = localStorage.getItem('channelName');
  subjectLevel = localStorage.getItem('subjectLevel');
  channelGrp = localStorage.getItem('channelGrp');

  // Object Data
  term: any;
  topic: any;
  status: any;
  
  code: any;
  respdata: any;
  savedata: any;
  editdata: any;

  savePath: string = '';

  public message!: string;
  public progress!: number;
  @Output() public onUploadFinished = new EventEmitter();

  ngOnInit(): void {
    console.log(this.editdata);
  }

  CreateCourseOutline() {
    const inputdata = {
      courseId: 0,
      term: String(this.term), // Use String() for clarity
      topic: String(this.topic),
      status: String(this.status),
      channel: String(this.channelName),
      subject: String(this.subjectLevel),
      channelGrp: String(this.channelGrp)
    };

    this.service.CreateCourseOutline(inputdata).subscribe(item => {
      this.savedata = item;
      console.log(this.savedata);
      if (this.savedata.responseCode === 201) {
        alertify.success("Updated successfully!");
        // Optionally call a method to refresh data
      } else {
        alertify.error("Failed, try again");
      }
    });
  }

  // Generate Code
  FunctionCheckCode() {
    console.log(this.code);
  }

  Redirect() {
    // Uncomment and implement redirection if needed
    // this.route.navigate(["/MyProfile"]);
  }

  FunctionClose() {
    this.ref.close();
  }
}
