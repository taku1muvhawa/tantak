import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
import { ManageAddModulePopupComponent } from '../manage-add-module-popup/manage-add-module-popup.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SideBarAdminComponent,
    SideBarComponent,
    TopNavComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {

  constructor( private dialog: MatDialog) { }

  // apiurl = this.url;

  date: any;

  channelGrpName: any;
  channelDescription: any;
  instructor: any;
  adminEmail: any;

  code: any;
  file!: File;
  onchange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile(code: string, file: File){

  }

  FunctionCreateChannel() {

    let popup = this.dialog.open(ModalAddChannelPopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
    // popup.afterClosed().subscribe(item => {
    //   this.GetAllChannels();
    // });
  }

  FunctionAddModule() {

    let popup = this.dialog.open(ManageAddModulePopupComponent, {
      width: '500px',
      //height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '500ms',
    })
    // popup.afterClosed().subscribe(item => {
    //   this.GetAllChannels();
    // });
  }


  }
