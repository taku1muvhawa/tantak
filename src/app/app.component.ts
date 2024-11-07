import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from '../material.module';
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    FormsModule,
    LoginComponent,
    RegisterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck {

  
  ngDoCheck(): void {
    
  }


  title = 'Colleges';
}
