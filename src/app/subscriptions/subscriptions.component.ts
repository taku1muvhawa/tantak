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
import { SubscriptionModel } from '../Model/SubscriptionModel';
import { SubscriptionService } from '../Service/subscription.service';
import { MatIconAnchor } from '@angular/material/button';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-subscriptions',
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
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {
  shortDate: string|undefined;
  constructor(private service:SubscriptionService, private dialog:MatDialog){}

  toggle = false;

  username = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic')
  
  ngOnInit():void{
    var postData={
      email: ""+this.email,
    };
    this.GetChannels(postData);
  }

  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

  checkedIn = false;

  ChannelDetail:any;
  ChannelSubscriptionDetail:any;
  currentDate = new Date();
  dataSource:any;

  GetChannels(inputdata: any) {
    if (inputdata != null) {
      this.service.GetSubsciptionsbyEmail(inputdata).subscribe(item=>{
        this.ChannelDetail=item
        // console.log(this.ChannelDetail)
        this.getChannelSubscription();
        this.dataSource=new MatTableDataSource<SubscriptionModel>(this.ChannelSubscriptionDetail);
        this.dataSource.paginator=this.paginator;
      });
    }
  }

  getChannelSubscription() {
    this.ChannelSubscriptionDetail = this.ChannelDetail.filter((s: { ExpiryDate: Date; }) =>
      new Date(s.ExpiryDate) > new Date(this.currentDate)
    );
  }

  // displayedColumns: string[] = ['channelGrp', 'channelSub','channelName','expiryDate','action'];
  displayedColumns: string[] = ['channelGrp', 'channelSub','expiryDate','action'];
  //dataSource = ELEMENT_DATA;
  FunctionUpdate(){
  }

  FunctionUpadateLocalStorage(grp:string, sub:string, name:string){
    localStorage.setItem("channelGrp",grp);
    localStorage.setItem("subjectLevel",sub);
    localStorage.setItem("channelName",name);

  }

  FunctionChannelEmail(name:string){
    localStorage.setItem("channelVEmail",name);
  }

}
