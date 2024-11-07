import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpHandler, HttpHeaders, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { BaseService } from '../Service/base.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-lm',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
    // SideBarAdminComponent,
    // SideBarComponent,
    // TopNavComponent
  ],
  templateUrl: './upload-lm.component.html',
  styleUrl: './upload-lm.component.css'
})
export class UploadLMComponent extends BaseService implements OnInit {
  code!: string;
  lesson!: string;
  topic!: string;
  objectives!: string;
  assignmentText!: string;
  fReleaseDate!: string;
  fClosingDate!: string;
  file!: File;
  btnClick: boolean = true;

  //Details
  moduleId = localStorage.getItem('moduleId');

  apiurl = this.url;

  constructor(private http: HttpClient, private ref: MatDialogRef<UploadLMComponent>) {
    super();
  }

  ngOnInit(): void {
  }

  onchange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile(code: string, file: File) {
    this.btnClick = false;
    const formData = new FormData();
    formData.append('module_id', this.moduleId || '');
    formData.append('lesson_no', this.lesson);
    formData.append('topic', this.topic);
    formData.append('objectives', this.objectives);
    formData.append('assignment', this.assignmentText);
    formData.append('release_date', this.fReleaseDate);
    // formData.append('ExpiryDate', this.fClosingDate);
    formData.append('file', this.file);

    this.http.post(this.apiurl+'/lessons/lesson', formData)
      .subscribe((response: any) => {
        console.log(response);
        this.btnClick = true;
        alertify.success('Lesson uploaded successfully!');
        this.FunctionClose();
      }, (error: any) => {
        console.error(error);
        this.btnClick = true;
      });
  }

  FunctionClose() {
    this.ref.close()
  }
}
