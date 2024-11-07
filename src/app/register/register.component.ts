import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private route:Router, private service:UserService){}
  RedirectLogin(){
    this.route.navigate(["/"]);
  }
  reactiveForm = new FormGroup({
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    phone: new FormControl(''),
    // Role: new FormControl('user'),
    // IsActive: new FormControl(true)
  })
  respdata:any;
  saveUser(){
    console.log(this.reactiveForm.value)
   if(this.reactiveForm.valid){
      this.service.Registration(this.reactiveForm.value).subscribe(item =>{
        this.respdata = item;
        console.log(this.respdata.value);
        if(this.respdata.status === '200')
        {
          alertify.success("Registration successful, you can proceed to login");
          this.RedirectLogin();
        }else{
          alertify.error("failed try again");
        }
      })
    }
  }

}

