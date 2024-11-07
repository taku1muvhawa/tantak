import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { TransactionModel } from '../Model/TransactionModel';
import { TransactionService } from '../Service/transaction.service';
import { FooterComponent } from '../Components/footer/footer.component';

import { Location } from '@angular/common';
import { SubscriptionService } from '../Service/subscription.service';
import { ChannelSubModel } from '../Model/ChannelSubModel';
import { ChannelSubService } from '../Service/channel-sub.service';
// import { ModalCashTransferPopupComponent } from '../modal-cash-transfer-popup/modal-cash-transfer-popup.component';
import { VoucherService } from '../Service/voucher.service';
import { ModalAddChannelPopupComponent } from '../modal-add-channel-popup/modal-add-channel-popup.component';

import { AssessmentService } from '../Service/assessment.service';
import { MatIconAnchor } from '@angular/material/button';
import { ManageCoursesPopupComponent } from '../manage-courses-popup/manage-courses-popup.component';
import { ManageAddCoursePopupComponent } from '../manage-add-course-popup/manage-add-course-popup.component';

import { ChannelService } from '../Service/channel.service';
import { ChannelModel } from '../Model/ChannelModel';
import { ManageChannelPopupComponent } from '../manage-channel-popup/manage-channel-popup.component';
import { ManageAddModulePopupComponent } from '../manage-add-module-popup/manage-add-module-popup.component';
import { GroupChannelService } from '../Service/group-channel.service';



@Component({
  selector: 'app-manage-courses',
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
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css'
})
export class ManageCoursesComponent {

  isAdmin = false;
  checkedIn = false;

  constructor(private service: ChannelSubService,private service2: ChannelService, private service3: GroupChannelService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllChannels();
    this.GetAllChannels2();
    this.GetAllChannels3();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator2: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator3: MatPaginator | undefined;

  ChannelDetail: any;
  myChannelDetail: any;
  dataSource: any;

  ChannelDetail2: any;
  myChannelDetail2: any;
  dataSource2: any;

  ChannelDetail3: any;
  dataSource3: any;

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelGrp = localStorage.getItem('channelGrp');

  GetAllChannels() {
    this.service.GetAllChannels().subscribe(item => {
      this.ChannelDetail = item
      //console.log(this.UserDetail)
      // this.GetMyChannel();
      this.dataSource = new MatTableDataSource<ChannelSubModel>(this.ChannelDetail);
      this.dataSource.paginator = this.paginator;
    });
  }

  displayedColumns: string[] = ['channelSubId', 'channelGrp', 'name', 'subjectLevel', 'description', 'instructor', 'action'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate(code: any) {

    let popup = this.dialog.open(ManageCoursesPopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
      data: {
        channelSubId: code
      }
    })
    popup.afterClosed().subscribe(item => {
      this.GetAllChannels();
    });
  }
  FunctionCreateCourse() {

    let popup = this.dialog.open(ManageAddCoursePopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
    popup.afterClosed().subscribe(item => {
      this.GetAllChannels();
    });
  }
  FunctionDelete(code: any) {
    alertify.confirm("Remove user", "Do you want to remove this user?", () => {
      this.service.RemoveChannel(code).subscribe(item => {
        this.GetAllChannels();
        alertify.success("Removed Successfully");
      })

    }, function () { });
  }

  // GetMyChannel() {
  //   this.myChannelDetail = this.ChannelDetail.filter((s: { channelGrp: string; }) =>s.channelGrp === this.channelGrp);
  // }

  // TABLE 2
  GetAllChannels2() {
    this.service2.GetAllChannels().subscribe(item => {
      this.ChannelDetail = item
      //console.log(this.UserDetail)
      // this.GetMyChannel();
      // this.dataSource2 = new MatTableDataSource<ChannelModel>(this.myChannelDetail);
      this.dataSource2 = new MatTableDataSource<ChannelModel>(this.ChannelDetail);
      this.dataSource2.paginator = this.paginator2;
    });
  }

  displayedColumns2: string[] = ['channelGrp', 'name', 'channelSub', 'teacher', 'teacherEmail', 'subscriptionFee', 'action'];

  FunctionUpdate2(code: any) {

    let popup = this.dialog.open(ManageChannelPopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
      data: {
        channelId: code
      }
    })
    popup.afterClosed().subscribe(item => {
      this.GetAllChannels2();
    });
  }

  FunctionDelete2(code: any) {
    alertify.confirm("Remove user", "Do you want to remove this user?", () => {
      this.service.RemoveChannel(code).subscribe(item => {
        this.GetAllChannels();
        alertify.success("Removed Successfully");
      })

    }, function () { });
  }

  // GetMyChannel() {
  //   this.myChannelDetail2 = this.ChannelDetail2.filter((s: { channelGrp: string; }) =>s.channelGrp === this.channelGrp);
  // }

  FunctionCreateModule() {

    let popup = this.dialog.open(ManageAddModulePopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
    popup.afterClosed().subscribe(item => {
      this.GetAllChannels();
    });
  }

  FunctionAddChannel(){
    let popup= this.dialog.open(ModalAddChannelPopupComponent,{
      width: '450px',
      //height:'400px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'500ms',
    })
    popup.afterClosed().subscribe(item=>{
      // this.GetAllTransactions();
    });
  }

  //Channels
  GetAllChannels3() {
    this.service3.GetAllChannels().subscribe(item => {
      this.ChannelDetail3 = item
      console.log(this.ChannelDetail3)
      this.dataSource3 = new MatTableDataSource<ChannelModel>(this.ChannelDetail3);
      this.dataSource3.paginator = this.paginator3;
    });
  }

  displayedColumns3: string[] = ['channelGrpId', 'name', 'instructor', 'adminEmail'];

}
