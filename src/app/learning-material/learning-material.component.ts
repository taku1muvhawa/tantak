import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { ChannelProgModel } from '../Model/ChannelProgModel';
// import { ChannelProgService } from '../Service/channel-prog.service';
import { MainService } from '../Service/main.service';
import { ChatsService } from '../Service/chats.service';
import { UserMasterService } from '../Service/user-master.service';
import { MessagesService } from '../Service/messages.service';
import { SideBarLmComponent } from "../Components/side-bar-lm/side-bar-lm.component";
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-learning-material',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SideBarAdminComponent,
    SideBarComponent,
    TopNavComponent,
    SideBarLmComponent,
    FooterComponent
],
  templateUrl: './learning-material.component.html',
  styleUrl: './learning-material.component.css'
})
export class LearningMaterialComponent implements OnInit {
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
  subjectLevel = localStorage.getItem('subjectLevel')
  channelVEmail = localStorage.getItem('channelVEmail');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');
  role = "";
  isChannelAdmin = false;

  newMessage!: string;
  myContactEmail!: string;

  respdata: any;

  displayDelete = false;

  ngOnInit(): void {
    var postData = {
      channelName: "" + this.channelName,
      channelGrp: "" + this.channelGrp,
      subLevel: "" + this.subjectLevel
    };
    var postData2 = {
      email: "" + this.channelVEmail
    }
    var postData3 = {
      senderEmail: "" + this.email,
      receiverEmail: "" + this.channelVEmail,
    }

    // this.CheckContact(postData3);
    this.FunctionCheckAdmin();
    this.GetContent(postData);
    // this.GetTeacherName(postData2);
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  //Dates
  currentDate = new Date();
  formattedCurrentDate = this.formatDate(this.currentDate);
  releaseDate = new Date();
  fReleaseDate = this.formatDate(this.releaseDate);
  closingDate = new Date();
  fClosingDate = this.formatDate(this.closingDate);

  repdata: any;
  contentinfo: any;
  myContentInfo: any; //Chech check

  //Teacher Name
  respdata2: any = {};
  respdata3: any = {};
  teacherName: any;

  isContactAvilable = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ChannelDetail: any;
  dataSource: any;

  GetContent(inputdata: any) {
    if (this.isChannelAdmin) {
      if (inputdata != null) {
        this.service.GetLessons(this.moduleID).subscribe(item => {
          this.dataSource = item
          console.log(this.dataSource);
          // this.dataSource = new MatTableDataSource<ChannelProgModel>(this.contentinfo);
          this.dataSource.paginator = this.paginator;
        });
      }
    } else {
      if (inputdata != null) {
        this.service.GetLessons(this.moduleID).subscribe(item => {
          this.dataSource = item
          console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
        });
      }
    }
  }


  displayedColumns: string[] = ['code'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate() {
  }

  // FunctionDelete(code: any) {
  //   alertify.confirm("Remove Lesson", "Do you want to remove this Lesson?", () => {
  //     this.service.RemoveContent(code).subscribe(item => {
  //       window.location.reload();
  //       alertify.success("Removed Successfully");
  //     })

  //   }, function () { });
  // }

  FunctionCheckAdmin() {
    if (this.channelVEmail === this.email) {
      this.isChannelAdmin = true;
    } else if (this.channelGrpAdmin === this.email) {
      this.isChannelAdmin = true;
    } else {
      this.isChannelAdmin = false;
    }
  }
}
