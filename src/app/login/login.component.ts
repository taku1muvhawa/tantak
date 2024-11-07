import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../Service/user.service';
import { Router, RouterLink } from '@angular/router';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private route:Router, private service:UserService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  ProceedLogin(loginForm: NgForm) {
    if((loginForm.value.email === '') || (loginForm.value.password ==='')){
      alertify.error("Fill in all the details to continue");
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const url = `${environment.TakuAngular.url}/users/${email}/${password}`;
    const active = "true"

    var postData={
      email: email,
      password: password,
    };

      this.service.Login(postData).subscribe(response =>{
      if (Object.values(response)[0] === '200') {
        const user = Object.values(response)[2];
        localStorage.setItem("user_id", user.user_id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("surname", user.Surname);
        localStorage.setItem("email", user.email);
        localStorage.setItem("loggedIn", active);
        console.log("Success")
        this.route.navigate(["/courses"]);
      } else {
        alertify.error("Login failed, incorrect username or password")
      }
    }, error => {
      alertify.error("An error occurred during login");
      console.error(error); 
    });
  }

}