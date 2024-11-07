import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LandingPageOneComponent } from './landing-page-one/landing-page-one.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LandingPageTwoComponent } from './landing-page-two/landing-page-two.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { LearningMaterialComponent } from './learning-material/learning-material.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { BooksComponent } from './books/books.component';
import { ReportsComponent } from './reports/reports.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FinancialAccountsComponent } from './financial-accounts/financial-accounts.component';
import { AuthGuard } from './Guard/auth.guard';
import { StatusComponent } from './status/status.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProlinkDashboardComponent } from './prolink-dashboard/prolink-dashboard.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentPerfomanceComponent } from './student-perfomance/student-perfomance.component';

export const routes: Routes = [
    {path:"",loadComponent:()=>import('./login/login.component').then(opt=>opt.LoginComponent)},
    {path: "register", component:RegisterComponent},
    {path: "courses", component:LandingPageOneComponent, canActivate:[AuthGuard]},
    {path: "myprofile", component:MyProfileComponent, canActivate:[AuthGuard]},
    {path: "level", component:LandingPageTwoComponent, canActivate:[AuthGuard]},
    {path: "modules", component:LandingPageComponent, canActivate:[AuthGuard]},
    {path: "studentdashboard", component:StudentHomeComponent, canActivate:[AuthGuard]},
    {path: "lessons", component:LearningMaterialComponent, canActivate:[AuthGuard]},
    {path: "assignments", component:AssignmentsComponent, canActivate:[AuthGuard]},
    {path: "books", component:BooksComponent, canActivate:[AuthGuard]},
    {path: "reports", component:ReportsComponent, canActivate:[AuthGuard]},
    {path: "feedback", component:FeedbackComponent, canActivate:[AuthGuard]},
    {path: "account", component:FinancialAccountsComponent, canActivate:[AuthGuard]},
    {path: "mycourses", component:SubscriptionsComponent, canActivate:[AuthGuard]},
    {path: "admin/dashboard", component:ProlinkDashboardComponent, canActivate:[AuthGuard]},
    {path: "manage/courses", component:ManageCoursesComponent, canActivate:[AuthGuard]},
    {path: "administrator", component:AdminDashboardComponent, canActivate:[AuthGuard]},
    {path: "course/management", component:CourseManagementComponent, canActivate:[AuthGuard]},
    {path: "enrollments", component:EnrollmentsComponent, canActivate:[AuthGuard]},
    {path: "teachers", component:TeachersComponent, canActivate:[AuthGuard]},
    {path: "student/reports", component:StudentPerfomanceComponent, canActivate:[AuthGuard]},
    {path: "**", component:StatusComponent}
];
