import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { FeedbackService } from '../Service/feedback.service';
import { UserMasterService } from '../Service/user-master.service';
import { first } from 'rxjs';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import { BaseService } from '../Service/base.service';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal-popup-submit-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-popup-submit-assignment.component.html',
  styleUrl: './modal-popup-submit-assignment.component.css'
})
export class ModalPopupSubmitAssignmentComponent extends BaseService implements OnInit {
  constructor(private http: HttpClient, private service: FeedbackService, private route: Router,
    private ref: MatDialogRef<ModalPopupSubmitAssignmentComponent>) {
    super()
  }

  assignmentId!: string;
  file!: File;
  btnClick: boolean = true;

  //Details
  moduleId = localStorage.getItem('moduleId');
  stuentID = localStorage.getItem('user_id');

  apiurl = this.url;



  public message!: string;
  public progress!: number;
  @Output() public onUploadFinished = new EventEmitter();


  ngOnInit(): void {
    // this.GetAllFeedback();
  }

  onchange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.btnClick = false;
    const formData = new FormData();
    formData.append('module_id', this.moduleId || '');
    formData.append('student_id', this.stuentID || '');
    formData.append('assignment_id', this.assignmentId);
    formData.append('file', this.file);

    this.http.post(this.apiurl + '/feedback/assignment', formData)
      .subscribe((response: any) => {
        console.log(response);
        this.btnClick = true;
        alertify.success('Assignment uploaded successfully!');
        this.FunctionClose();
      }, (error: any) => {
        console.error(error);
        this.btnClick = true;
      });
  }

  FunctionClose() {
    this.ref.close()
    window.location.reload();
  }

}
