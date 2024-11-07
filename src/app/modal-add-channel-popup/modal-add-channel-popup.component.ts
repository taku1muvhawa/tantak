import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ChannelGrpService } from '../Service/channel-grp.service';
import { UserMasterService } from '../Service/user-master.service';
import { first } from 'rxjs';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import { BaseService } from '../Service/base.service';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-add-channel-popup',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-add-channel-popup.component.html',
  styleUrl: './modal-add-channel-popup.component.css'
})
export class ModalAddChannelPopupComponent extends BaseService implements OnInit {
constructor(private http: HttpClient, private service: ChannelGrpService, private route: Router,
    private ref: MatDialogRef<ModalAddChannelPopupComponent>) 
    { 
      super()
    }

    ngOnInit(): void {
      
    }


  // usermane = localStorage.getItem('name');
  // email = localStorage.getItem('email');
  // profilePic = localStorage.getItem('profilePic');
  // channelName = localStorage.getItem('channelName');
  // subjectLevel = localStorage.getItem('subjectLevel');
  // channelGrp = localStorage.getItem('channelGrp');


  //Object Data

  apiurl = this.url;

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

  uploadFile(code: string, file: File) {
    // this.btnClick = false;
    const formData = new FormData();
    formData.append('Name', this.channelGrpName);
    formData.append('Description', this.channelDescription);
    formData.append('Instructor', this.instructor);
    formData.append('AdminEmail', this.adminEmail);
    formData.append('file', this.file);

    this.http.post(this.apiurl+'/channels/channel', formData)
      .subscribe((response: any) => {
        console.log(response);
        // this.btnClick = true;
        alertify.success('Lesson uploaded successfully!');
        this.FunctionClose();
      }, (error: any) => {
        console.error(error);
        // this.btnClick = true;
      });
  }
 
  FunctionClose() {
    this.ref.close();
  }
}
