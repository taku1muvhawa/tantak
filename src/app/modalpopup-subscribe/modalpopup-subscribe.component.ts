import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelModel } from '../Model/ChannelModel';
import { GroupChannelService } from '../Service/group-channel.service';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { AssessmentService } from '../Service/assessment.service';
import { ChannelSubService } from '../Service/channel-sub.service';
import { MatIconAnchor } from '@angular/material/button';
import { UploadLMComponent } from '../upload-lm/upload-lm.component';


import { UserMasterService } from '../Service/user-master.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { SubscriptionService } from '../Service/subscription.service';
import { SubscriptionModel } from '../Model/SubscriptionModel';
import { TransactionModel } from '../Model/TransactionModel';
import { TransactionService } from '../Service/transaction.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { BaseService } from '../Service/base.service';
@Component({
  selector: 'app-modalpopup-subscribe',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modalpopup-subscribe.component.html',
  styleUrl: './modalpopup-subscribe.component.css'
})
export class ModalpopupSubscribeComponent extends BaseService implements OnInit {
  constructor(private http: HttpClient, private service: UserMasterService, private service2: SubscriptionService, private service3: TransactionService, private route: Router,
    private ref: MatDialogRef<ModalpopupSubscribeComponent>) { 
      super()
    }

  ngOnInit(): void {
    this.GetAllTransactions();
    this.FunctionGetPrice();
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  btnClick = false;

  apiurl = this.url;


  channelGrp = localStorage.getItem('channelGrp');
  channelSub = localStorage.getItem('subjectLevel');
  channelName = localStorage.getItem('channelName');
  channelGrpAdmin = localStorage.getItem('channelGrpAdmin');
  form = localStorage.getItem('channelLevel');

  //Transaction Details
  currentDate = new Date();

  formattedDate = this.formatDate(this.currentDate);
  details: any = "" + this.channelGrp + " " + this.channelSub;

  respdata: any;


  //Account Details
  email = localStorage.getItem('email');
  channelVEmail = localStorage.getItem('channelVEmail');
  subscriptionStatus = localStorage.getItem('subscriptionStatus')
  subscriptionFee: any;

  FunctionGetPrice() {
    this.subscriptionFee = localStorage.getItem('subscriptionFee');
  }

  //Transaction Details
  transactionDetail: any;
  myTransactionDetail: any;
  channelTransactionDetail: any;
  lastTransactionDetail: any;
  balance: number = 0;
  balance2: number = 0;
  balance3: number = 0;
  charges = 0.12;
  savedata: any;
  savedata2: any;

  FunctionSubscribe() {
    window.location.href = `${this.apiurl}/initiate-payment`;
  }

  MakePayment(amount: number) {

    var postData = {
      transactionId: 0,
      date: "" + this.formattedDate,
      paymentType: "subscription",
      detail: "" + this.details,
      subscription: "N/A",
      paidIn: 0,
      paidOut: amount,
      balance: this.balance - amount,
      email: "" + this.email,
      receiverEmail: "string",
      prolinkEmail: ""
    };
    var postData2 = {
      transactionId: 0,
      date: "" + this.formattedDate,
      paymentType: "subscription",
      detail: "" + this.details + "Sender: " + this.email,
      subscription: "N/A",
      paidIn: (amount * 0.88),
      paidOut: 0,
      balance: this.balance2 + (amount * 0.88),
      email: "" + this.channelGrpAdmin, //Receiver
      receiverEmail: "" + this.email, //Sender
      prolinkEmail: ""
    };
    var postData3 = {
      transactionId: 0,
      date: "" + this.formattedDate,
      paymentType: "subscription",
      detail: "" + this.details + "Sender: " + this.email,
      subscription: "N/A",
      paidIn: (amount * 0.12),
      paidOut: 0,
      balance: this.balance3 + (amount * 0.12),
      email: "prolinkportal@gmail.com", //Receiver
      receiverEmail: "" + this.email, //Sender
      prolinkEmail: ""
    };
    // console.log("postData 1: " + JSON.stringify(postData));
    // console.log("postData 2: " + JSON.stringify(postData2));
    // console.log("postData 3: " + JSON.stringify(postData2));

    console.log(postData);
    this.service3.CreateTransaction(postData).subscribe(item => {
      this.savedata = item;
      console.log(postData);
      console.log(this.savedata);
      if (this.savedata.responseCode == 201) {
        this.service3.CreateTransaction(postData2).subscribe(item => {
          this.savedata = item;
          console.log(postData);
          console.log(this.savedata);
        })
        this.service3.CreateTransaction(postData3).subscribe(item => {
          this.savedata2 = item;
          console.log(postData3);
          console.log(this.savedata2);
        })


        //Prolink Account

        this.Subscribe();
        this.GetAllTransactions();
      } else {
        alertify.error("Failed try again");
      }
    })
  }

  Subscribe() {
    const expiryDate = new Date(this.currentDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const formattedExpDate = this.formatDate(expiryDate);

    var postData = {
      email: "" + this.email,
      channelGrp: "" + this.channelGrp,
      channelSub: "" + this.channelSub,
      form: "" + this.form,
      isActive: true,
      sDate: "" + this.formattedDate,
      expiryDate: "" + formattedExpDate,
      sCode: null,
      channelName: "" + this.channelName,
    };
    //console.log(this.reactiveForm.value);
    this.service2.CreateSubscription(postData).subscribe(item => {
      //this.reactiveForm.valid
      this.respdata = item;
      console.log(this.respdata.value);
      if (this.respdata.result == '0') {
        alertify.success("Subscribed successfully");
        this.Redirect();
        this.btnClick = true; //Hide subscribe btn
      } else {
        alertify.error("failed try again");
      }
    })
  }

  Redirect() {
    this.route.navigate(["/StudentHome"]);
  }

  getAccountBalance() {
    this.myTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === this.email);
    const lastTransaction = this.myTransactionDetail.pop();
    console.log("Last transaction:", lastTransaction);
    this.balance = lastTransaction.balance;
  }
  getAccountBalance2() {
    this.channelTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === this.channelVEmail);
    const lastTransaction = this.channelTransactionDetail.pop();
    console.log("Last transaction:", lastTransaction);
    this.balance2 = lastTransaction.balance;
    console.log(this.balance2)
  }
  getAccountBalance3() {
    this.channelTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === "prolinkportal@gmail.com");
    const lastTransaction = this.channelTransactionDetail.pop();
    console.log("Last transaction:", lastTransaction);
    this.balance3 = lastTransaction.balance;
  }
  GetAllTransactions() {
    this.service3.GetAllTransactions().subscribe(item => {
      this.transactionDetail = item
      console.log(this.transactionDetail)
      //this.dataSource=new MatTableDataSource<TransactionModel>(this.myTransactionDetail);
      //this.dataSource.paginator=this.paginator;
      this.getAccountBalance();
      this.getAccountBalance2();
      this.getAccountBalance3();
    });
  }

  FunctionClose() {
    this.ref.close();
  }

}
