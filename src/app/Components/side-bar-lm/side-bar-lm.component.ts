import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar-lm',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-lm.component.html',
  styleUrl: './side-bar-lm.component.css'
})
export class SideBarLmComponent {
  toggle = false;
  usermane = localStorage.getItem('name');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  role = localStorage.getItem('role')
}
