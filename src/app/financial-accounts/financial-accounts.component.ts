import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-financial-accounts',
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
  templateUrl: './financial-accounts.component.html',
  styleUrl: './financial-accounts.component.css'
})
export class FinancialAccountsComponent implements OnInit {

  constructor(private service: TransactionService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit() {
    this.GetAllTransactions();
  }

  toggle = false;
  checkedIn = false;

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');

  role = localStorage.getItem('role');

  //Transaction Details
  currentDate = new Date();
  formattedDate = this.formatDate(this.currentDate);
  details: any = "account topup";

  balance = 0;
  agentCode!: number;
  voucher!: number;
  subscription: any;
  amountDeposited: number = 1;
  studentEmail: any = "";

  newBalance = this.balance + this.amountDeposited;

  dataSource: any;

  displayedColumns: string[] = ['date', 'paymentType', 'detail', "Dr", "Cr"];


  //API Response
  savedata: any;

  //Transaction Details
  transactionDetail: any;
  myTransactionDetail: any;
  lastTransactionDetail: any;

  // Method to get the student's account balance
  getAccountBalance() {
    this.myTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === this.email);
    const lastTransaction = this.myTransactionDetail.pop();
    console.log("Last transaction:", lastTransaction);
    this.balance = lastTransaction.balance;
  }
  //Student Balance
  getStudentAccountBalance(studentEmail: any) {
    this.myTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === studentEmail);
    const lastTransaction = this.myTransactionDetail.pop();
    console.log("Last transaction:", lastTransaction);
    this.balance = lastTransaction.balance;
  }
  GetAllTransactions() {
    this.service.GetAllTransactions().subscribe(item => {
      this.transactionDetail = item
      console.log(this.transactionDetail)
      this.GetMyTransactions()
      this.dataSource = new MatTableDataSource<TransactionModel>(this.myTransactionDetail);
      this.dataSource.paginator = this.paginator;
      this.getAccountBalance();
    });
  }

  // TO BE CONTINUED
  //Student Calculations 
  GetAllTransactionsTs() {
    this.service.GetAllTransactions().subscribe(item => {
      this.transactionDetail = item
      console.log(this.transactionDetail.reverse())
      this.GetMyTransactions()
      this.dataSource = new MatTableDataSource<TransactionModel>(this.myTransactionDetail);
      this.dataSource.paginator = this.paginator;
      this.getAccountBalance();
    });
  }
  GetMyTransactions() {
    this.myTransactionDetail = this.transactionDetail.filter((s: { email: string; }) => s.email === this.email);
    console.log("transactions " + this.myTransactionDetail);
  }

  reloadPage() {
    window.location.reload();
  }

  message: any;

  // FunctionPopup() {
  //   let popup = this.dialog.open(ModalCashTransferPopupComponent, {
  //     width: '450px',
  //     //height:'400px',
  //     exitAnimationDuration: '1000ms',
  //     enterAnimationDuration: '500ms',
  //   })
  //   popup.afterClosed().subscribe(item => {
  //     this.GetAllTransactions();
  //   });
  // }

  // CASH IN

  voucherId!: number;

  button = localStorage.getItem('btnClick')
  SubscriptionStatus = localStorage.getItem('subscriptionStatus');
  channelRole = "Teacher";

  depositFunds(amountDeposited: number, email: any) {
    var postData = {
      transactionId: 0,
      date: "" + this.formattedDate,
      paymentType: "fees deposit",
      detail: "" + this.details,
      subscription: "N/A",
      paidIn: amountDeposited,
      paidOut: 0,
      balance: amountDeposited,
      email: "" + email
    };
    var postData2 = {
      transactionId: 0,
      date: "" + this.formattedDate,
      paymentType: "fees deposit",
      detail: "" + this.details,
      subscription: "N/A",
      paidIn: amountDeposited,
      paidOut: 0,
      balance: this.balance + amountDeposited,
      email: "" + this.email
    };
    console.log(postData);
    this.service.CreateTransaction(postData).subscribe(item => {
      this.savedata = item;
      console.log(postData);
      console.log(this.savedata);
      if (this.savedata.responseCode == 201) {

        //Update Admin balance
        this.service.CreateTransaction(postData2).subscribe(item => {
          this.savedata = item;
          console.log(postData);
          console.log(this.savedata);
          if (this.savedata.responseCode == 201) {
            alertify.success("Account topup successful!");
            this.GetAllTransactions();
          } else {
            alertify.error("Failed try again");
          }
        })
        //End of bloack

        // alertify.success("Account topup successful!");
        // this.SendSMS();
        // this.GetAllTransactions();
      } else {
        alertify.error("Failed try again");
      }
    })
  }

  //Voucher Verification
  voucherDetail: any;
  voucherDetail2: any;
  voucherDetail3: any;
  responseString: any = {};


}
