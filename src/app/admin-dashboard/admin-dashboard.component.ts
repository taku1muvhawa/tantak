import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { SideBarAdminComponent } from '../Components/side-bar-admin/side-bar-admin.component';
import { SideBarComponent } from '../Components/side-bar/side-bar.component';
import { TopNavComponent } from "../Components/top-nav/top-nav.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalpopupProPicComponent } from '../modalpopup-pro-pic/modalpopup-pro-pic.component';
import { UserMasterService } from '../Service/user-master.service';
import { FooterComponent } from '../Components/footer/footer.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
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
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  isAdmin = false;

  ngOnInit(): void {
    this.RenderChart();
    this.RenderChart2();
  }

  RenderChart() {
    new Chart("barchart", {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April'],  // Months
            datasets: [{
                label: 'Systimatic Theology',
                data: [50, 60, 55, 40],  // Dummy data for Basic subscriptions
                backgroundColor: 'rgba(255, 99, 132, 1)',  // Red
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Pastorial Couselling',
                data: [65, 50, 70, 60],  // Dummy data for Standard subscriptions
                backgroundColor: 'rgba(54, 162, 235, 1)',  // Blue
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Church History',
                data: [30, 40, 50, 20],  // Dummy data for Premium subscriptions
                backgroundColor: 'rgba(255, 206, 86, 1)',   // Yellow
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }, {
                label: 'Esther \'s Classes',
                data: [20, 30, 10, 15],  // Dummy data for Family subscriptions
                backgroundColor: 'rgba(75, 192, 192, 1)',   // Green
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Parenting Classes',
                data: [10, 8, 12, 15],  // Dummy data for Student subscriptions
                backgroundColor: 'rgba(153, 102, 255, 1)',  // Purple
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '# of Subscriptions'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });
}


RenderChart2() {
    new Chart("piechart", {
        type: 'pie',
        data: {
            labels: ['Systimatic Theology', 'Pastorial Couselling', 'Church History', 'Esther \'s Classes', 'Parenting Classes'],
            datasets: [{
                label: '# of Courses',
                data: [30, 25, 15, 10, 20],  // Dummy course data
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',  // Red
                    'rgba(54, 162, 235, 1)',  // Blue
                    'rgba(255, 206, 86, 1)',   // Yellow
                    'rgba(75, 192, 192, 1)',   // Green
                    'rgba(153, 102, 255, 1)'   // Purple
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });
}



}
