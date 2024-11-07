import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { UploadAssignmentComponent } from '../upload-assignment/upload-assignment.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from '../Components/top-nav/top-nav.component';

import { NotesService } from '../Service/notes.service';
import { MainService } from '../Service/main.service';
import { NotesModel } from '../Model/NotesModel';
import { UploadNotesComponent } from '../upload-notes/upload-notes.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-books',
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
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  constructor(private service:MainService, private dialog:MatDialog){}

  toggle = false;
  checkedIn = false;

  userID = localStorage.getItem('user_id');
  moduleID = localStorage.getItem('moduleId');

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelName = localStorage.getItem('channelName');
  channelGrp = localStorage.getItem('channelGrp');
  channelSub = localStorage.getItem('subjectLevel');
  channelVEmail = localStorage.getItem('channelVEmail');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');
  isChannelAdmin = false;

  ngOnInit(): void {
    this.GetAllNotes();
    this.FunctionCheckAdmin();
  }
  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

  NotesDetail:any;
  dataSource:any;
  myNotesDetail:any;

  GetAllNotes(){
    this.service.GetNotes(this.moduleID).subscribe(item=>{
      this.dataSource=item
      console.log(this.dataSource)
      this.dataSource.paginator=this.paginator;
    });
  }

  displayedColumns: string[] = ['title', 'author','action', 'delete'];
  //dataSource = ELEMENT_DATA;
  FunctionDelete(code:any){
    alertify.confirm("Remove book", "Do you want to remove this Pdf?",()=>{
      this.service.DeleteNotes(code).subscribe(item=>{
        this.GetAllNotes();
        alertify.success("Removed Successfully");
    })

    },function(){});
  }

  FunctionPopup(){
    let popup= this.dialog.open(UploadAssignmentComponent,{
      width: '450px',
      //height:'400px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'500ms',
    })
  }
  FunctionPopup2(){
    let popup= this.dialog.open(UploadNotesComponent,{
      width: '450px',
      //height:'400px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'500ms',
    })
  }

  FunctionCheckAdmin(){
    if(this.channelVEmail === this.email)
    {
      this.isChannelAdmin = true;
    }else if(this.channelGrpAdmin === this.email)
    {
      this.isChannelAdmin = true;
    }else{
      this.isChannelAdmin = false;
    }
  }
}
