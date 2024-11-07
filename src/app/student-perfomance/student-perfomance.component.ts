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
import { SubscriptionModel } from '../Model/SubscriptionModel';
import { SubscriptionService } from '../Service/subscription.service';
import { MatIconAnchor } from '@angular/material/button';
import { FooterComponent } from '../Components/footer/footer.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-student-perfomance',
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
  templateUrl: './student-perfomance.component.html',
  styleUrl: './student-perfomance.component.css'
})
export class StudentPerfomanceComponent implements OnInit {

  ngOnInit(): void {
    this.RenderChart();
    this.RenderChart2();
  }

  RenderChart() {
    new Chart("overallPerformanceChart", {
      type: 'bar',
      data: {
        labels: ['Old T/ Survey', 'New T/ Survey', 'Evangelism', 'History'],
        datasets: [{
          label: 'Grades',
          data: [92, 85, 88, 80],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  RenderChart2() {
    new Chart("modulePerformanceChart", {
      type: 'line',
      data: {
        labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4'],
        datasets: [{
          label: 'Performance Over Modules',
          data: [85, 90, 78, 92],
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }


}
