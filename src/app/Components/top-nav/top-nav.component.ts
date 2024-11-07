import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  name = localStorage.getItem('name');
  surname = localStorage.getItem('surname');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('profilePic');
  role = localStorage.getItem('role')

  // ICONS
  faLinkedin = faLinkedin;
  faSearch = faSearch;
}
