import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from 'src/app/login/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateCourseComponent } from './create/course/course.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateCourseComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AdminModule { }