import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar-admin',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.css'
})
export class SideBarAdminComponent {
  toggle = false;
  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  role = localStorage.getItem('role')
}
