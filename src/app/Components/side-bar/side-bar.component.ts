import { Component, OnInit } from '@angular/core';
import { SideBar2Component } from "../side-bar2/side-bar2.component";
import { TopNavComponent } from "../top-nav/top-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SideBar2Component, TopNavComponent, FooterComponent, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  ngOnInit(): void {
    this.CheckRole();
  }
  toggle = false;
  isAdmin = false;
  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  role = localStorage.getItem('role')

  CheckRole(){
    if(this.role === 'Admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }
}
