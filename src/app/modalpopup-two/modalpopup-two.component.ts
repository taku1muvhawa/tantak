import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../Service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelModel } from '../Model/ChannelModel';
import { GroupChannelService } from '../Service/group-channel.service';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { AssessmentService } from '../Service/assessment.service';
import { ChannelSubService } from '../Service/channel-sub.service';
import { MatIconAnchor } from '@angular/material/button';
import { UploadLMComponent } from '../upload-lm/upload-lm.component';

@Component({
  selector: 'app-modalpopup-two',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SideBarAdminComponent,
    SideBarComponent,
    TopNavComponent,
    RouterLink
  ],
  templateUrl: './modalpopup-two.component.html',
  styleUrl: './modalpopup-two.component.css'
})
export class ModalpopupTwoComponent implements OnInit {
  constructor(private dialog: MatDialog, private ref: MatDialogRef<UploadLMComponent>, private route:Router) { }

  ngOnInit(): void {
    this.CheckRole();
  }

  button = localStorage.getItem('btnClick');
  SubscriptionStatus = localStorage.getItem('subscriptionStatus');
  // SubscriptionStatus = 'False';
  channelRole: any;
  channelVEmail = localStorage.getItem('channelVEmail');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');
  email = localStorage.getItem('email');

  userId = localStorage.getItem("user_id");
  collegedminId = localStorage.getItem("collegedminId");
  courseAdminId = localStorage.getItem("courseAdminId");
  teacherId = localStorage.getItem("teacherId");

  FunctionUpdate() {
    this.ref.close();
    let popup = this.dialog.open(UploadLMComponent, {
      width: '450px',
      //height:'400px',
      exitAnimationDuration: '300ms',
      enterAnimationDuration: '500ms',
    })
  }
  CheckRole() {
    if (this.userId === this.collegedminId || this.userId === this.courseAdminId || this.userId === this.teacherId) {
    // if (this.userId === '5') {
      this.channelRole = "Teacher";
    } else {
      this.channelRole = "Student";
    }
    // console.log(this.channelRole);
  }

  FunctionClosePopup() {
    this.RedirectToLearningMaterial();
    this.ref.close();
  }

  RedirectToLearningMaterial() {
    this.route.navigate(["/lessons"]);
  }

}
