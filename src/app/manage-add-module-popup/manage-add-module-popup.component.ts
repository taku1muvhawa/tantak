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
import { ChannelService } from '../Service/channel.service';

@Component({
  selector: 'app-manage-add-module-popup',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-add-module-popup.component.html',
  styleUrl: './manage-add-module-popup.component.css'
})
export class ManageAddModulePopupComponent extends BaseService implements OnInit {

  constructor(private http: HttpClient, private service: ChannelService, private route: Router,
    private ref: MatDialogRef<ManageAddModulePopupComponent>) 
    { 
      super()
    }


  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelName = localStorage.getItem('channelName');
  subjectLevel = localStorage.getItem('subjectLevel');
  channelGrp = localStorage.getItem('channelGrp');


  //Object Data
  date: any;


  name: any;
  channelDescription: any;
  teacher: any;
  form: any;
  channelGroup: any;
  channelSub: any;
  subscriptionFee: number = 0;
  teacherEmail: any;

  code: any;
  file!: File;
  image: any;
  respdata: any;
  savedata: any;
  editdata: any;

  savePath: string = '';

  filebytes: any;
  filename!: string;
  filetype!: string;
  filesize: any;
  filedescription!: string;
  description: string = "test";


  public message!: string;
  public progress!: number;
  @Output() public onUploadFinished = new EventEmitter();


  ngOnInit(): void {
    console.log(this.editdata);
    this.GetAllBooks();
  }

  onchange(event: any) {
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.filebytes = reader.result?.toString().split(",")[1];
      (this.filename = this.file.name), (this.filetype = this.file.type);
      this.filedescription = this.description;
      this.filesize = this.file.size;
      this.image = reader.result;
      console.log(this.image);
    }
  }

  uploadFile(productCode: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    console.log("productCode", productCode);
    console.log("formData", formData);

    this.service.UploadPhoto(productCode, formData, httpOptions).subscribe(
      (item: any) => {
        this.respdata = item;
        console.log(this.respdata);
        this.GetFilePath(productCode, this.savePath);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  GetFilePath(productCode: string, path: string): void {
    const url = `${this.url}/Product/GetImage?productcode=${productCode}`;

    this.http.get(url, { responseType: 'text' })
      .subscribe((response: string) => {
        const imagePath = response; // Extract the image path from the response
        this.savePath = response; 
        localStorage.setItem('savePath', this.savePath);
        console.log(imagePath); // Display the image path in the console or use it as needed

        var inputdata = {
          channelId: 0,
          name: ""+this.name,
          description: ""+this.channelDescription,
          profilePic: ""+imagePath,
          teacher: ""+this.teacher,
          form: ""+this.form,
          channelGrp: ""+this.channelGroup,
          channelSub: ""+this.channelSub,
          subscriptionFee: this.subscriptionFee,
          teacherEmail: ""+this.teacherEmail
        }

        this.service.CreateChannel(inputdata).subscribe(item => {
          this.savedata = item;
          console.log(this.savedata);
          if (this.savedata.responseCode == 201) {
            alertify.success("updated successfully!")
            console.log(imagePath);
            //this.GetAllLessons();
          } else {
            alertify.error("Failed try again");
          }
        })

      }, error => {
        console.error('Error retrieving file:', error);
      });
  }

  //Generate Code

  lessonDetail: any;
  myLessonDetail: any;

  GetVideoCode() {
    this.myLessonDetail = this.lessonDetail;
    const lastLesson = this.myLessonDetail.pop();
    console.log("Last transaction:", lastLesson);
    this.code = lastLesson.channelId + 1;
    console.log(this.code);
  }
  GetAllBooks() {
    this.service.GetAllChannels().subscribe(item => {
      this.lessonDetail = item
      console.log(this.lessonDetail)
      this.GetVideoCode();
    });
  }

  FunctionCheckCode() {
    console.log(this.code);
  }

  Redirect() {
    //this.route.navigate(["/MyProfile"]);
  }
  FunctionClose() {
    this.ref.close();
  }

}
