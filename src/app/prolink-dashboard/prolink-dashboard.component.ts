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

@Component({
  selector: 'app-prolink-dashboard',
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
  templateUrl: './prolink-dashboard.component.html',
  styleUrl: './prolink-dashboard.component.css'
})
export class ProlinkDashboardComponent implements OnInit{

  constructor(private service:TransactionService, private service2:SubscriptionService, private service4:VoucherService,
    private service3:ChannelSubService, private dialog:MatDialog, private location: Location,
    private route:Router){}


    @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

    ngOnInit(){
      var postData={
        channelGrp: "" + this.channelGrp
      };
      this.GetAllTransactions();
      this.GetAllSubscriptions();
      this.GetChannels(postData);
      // this.FunctionAuthenticate();
    }

  toggle = false;
  checkedIn = false;

  formatDate(date:Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  channelGrp = localStorage.getItem('channelGrp');
  channelLevel = localStorage.getItem('subjectLevel');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');

  //Transaction Details
  currentDate = new Date();
  formattedDate = this.formatDate(this.currentDate);
  details: any = "account topup";

  balance = 0;
  agentCode!: number;
  voucher!:number;
  subscription:any;
  amountDeposited: number = 1;

  newBalance = this.balance + this.amountDeposited;

  dataSource:any;

  displayedColumns: string[] = ['date', 'paymentType', 'detail', "paidIn", "paidOut", "balance"];


  //API Response
  savedata: any;

  FunctionSubmit(amt:number){
    var postData = {
      voucher: ""+this.voucher
    }
    console.log(this.agentCode);
    //this.GetVoucher(postData, amt);
    // this.depositFunds(amt);
  }

  //Transaction Details
  transactionDetail: any;
  myTransactionDetail:any;
  lastTransactionDetail: any;

  //Subscription Details
  subscriptionDetail:any = {};
  mySubscriptionDetail:any = {};
  subscriptionHistory:any = {};
  courseSubscriptionHistory:any ={};
  activeSubscriptions!:number;
  allSubscriptions:number = this.subscriptionDetail.length;


 // Method to deposit funds into the student's account
 depositFunds(amountDeposited: number){
  var postData={
    transactionId: 0,
    date: ""+this.formattedDate,
    paymentType: "agent-code",
    detail: ""+this.details,
    subscription: "N/A",
    paidIn: amountDeposited,
    paidOut: 0,
    balance: amountDeposited + this.balance,
    email: ""+this.email
  };
  console.log(postData);
    this.service.CreateTransaction(postData).subscribe(item=>{
      this.savedata=item;
      console.log(postData);
      console.log(this.savedata);
      if(this.savedata.responseCode==201){
        alertify.success("Account topup successful!");
        this.GetAllTransactions();
      }else{
        alertify.error("Failed try again");
      }
    })
}

// Method to get the student's account balance
getAccountBalance() {
  this.myTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === this.email);
  const lastTransaction = this.myTransactionDetail.pop();
  console.log("Last transaction:", lastTransaction);
  this.balance = lastTransaction.balance;
}
GetAllTransactions(){
  this.service.GetAllTransactions().subscribe(item=>{
    this.transactionDetail=item
    console.log(this.transactionDetail)
    this.GetMyTransactions()
    this.dataSource=new MatTableDataSource<TransactionModel>(this.myTransactionDetail);
    this.dataSource.paginator=this.paginator;
    this.getAccountBalance();
  });
}
GetMyTransactions(){
  this.myTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === this.email);
  console.log("transactions "+ this.myTransactionDetail);
 }

 reloadPage() {
  window.location.reload();
}

GetAllSubscriptions(){
  this.service2.GetAllChannels().subscribe(item=>{
    this.subscriptionDetail=item
    console.log(this.subscriptionDetail)
    //this.dataSource=new MatTableDataSource<TransactionModel>(this.myTransactionDetail);
    //this.dataSource.paginator=this.paginator;
    this.getChannelSubscription();
    this.getChannelSubscriptionHistory();
    this.getCourseSubscriptionHistory();
  });
}
getChannelSubscription() {
  this.mySubscriptionDetail = this.subscriptionDetail.filter((s: { channelSub: string; channelName: string; channelGrp: string; expiryDate: Date; }) =>
    //s.channelSub === this.channelLevel &&
    s.channelGrp === this.channelGrp &&
    //s.channelName === this.channelName &&
    new Date(s.expiryDate) > new Date(this.currentDate)
  );

  console.log("Active Subscriptions " + this.mySubscriptionDetail);
  this.activeSubscriptions = this.mySubscriptionDetail.length; 
  console.log("Active Subscribers " + this.activeSubscriptions);
}
getChannelSubscriptionHistory() {
  this.subscriptionHistory = this.subscriptionDetail.filter((s: { channelSub: string; channelName: string; channelGrp: string; expiryDate: Date; }) =>
    //s.channelSub === this.channelLevel &&
    s.channelGrp === this.channelGrp 
    //s.channelName === this.channelName &&
    //new Date(s.expiryDate) > new Date(this.currentDate)
  );
}
getCourseSubscriptionHistory() {
  this.courseSubscriptionHistory = this.subscriptionDetail.filter((s: { channelSub: string; channelName: string; channelGrp: string; expiryDate: Date; }) =>
    s.channelSub === this.channelLevel &&
    s.channelGrp === this.channelGrp &&
    //s.channelName === this.channelName &&
    new Date(s.expiryDate) > new Date(this.currentDate)
  );
}

@ViewChild(MatPaginator) paginator2 : MatPaginator | undefined;

ChannelDetail:any;
dataSource2:any;
displayedColumns2: string[] = ['name'];

GetChannels(inputdata: any) {
  if (inputdata != null) {
    this.service3.GetChannelsbyInstitution(inputdata).subscribe(item=>{
      this.ChannelDetail=item
      console.log(this.ChannelDetail)
      this.dataSource2=new MatTableDataSource<ChannelSubModel>(this.ChannelDetail);
      this.dataSource2.paginator=this.paginator2;
    });
  }
}


// FunctionAuthenticate(){
//   if(this.email != "prolinkportal@gmail.com")
//   {
//     if(this.channelGrpAdmin != this.email)
//     {
//       this.route.navigate(["/LandingPageOne"]);
//     }
//   }
// }

// FunctionPopup(){
//   let popup= this.dialog.open(ModalCashTransferPopupComponent,{
//     width: '450px',
//     //height:'400px',
//     exitAnimationDuration:'1000ms',
//     enterAnimationDuration:'500ms',
//   })
//   popup.afterClosed().subscribe(item=>{
//     this.GetAllTransactions();
//   });
// }

FunctionAddChannel(){
  let popup= this.dialog.open(ModalAddChannelPopupComponent,{
    width: '450px',
    //height:'400px',
    exitAnimationDuration:'1000ms',
    enterAnimationDuration:'500ms',
  })
  popup.afterClosed().subscribe(item=>{
    this.GetAllTransactions();
  });
}




}
