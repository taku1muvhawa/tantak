import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { ChannelModel } from '../Model/ChannelModel';
import { GroupChannelService } from '../Service/group-channel.service';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-landing-page-one',
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
  templateUrl: './landing-page-one.component.html',
  styleUrl: './landing-page-one.component.css'
})
export class LandingPageOneComponent implements OnInit {
  constructor(private service: GroupChannelService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllChannels();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ChannelDetail: any;
  dataSource: any;

  GetAllChannels() {
    this.service.GetAllChannels().subscribe(item => {
      this.ChannelDetail = item
      console.log("Channel Details: ",this.ChannelDetail)
      this.dataSource = new MatTableDataSource<ChannelModel>(this.ChannelDetail);
      this.dataSource.paginator = this.paginator;
    });
  }

  displayedColumns: string[] = ['channelId', 'name'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate() {
  }

  FunctionCollegeId(id: string) {
    localStorage.setItem("collegeId", id);
  }

  FunctionCollegeName(name: string) {
    localStorage.setItem("collegeName", name);
  }
  FunctionCollegeAdmin(id: string) {
    localStorage.setItem("collegedminId", id);
  }

}
