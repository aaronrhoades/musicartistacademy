import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from 'src/app/user/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateCourseComponent } from './create/course/course.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorAlertModule } from '../shared/error-alert/error-alert.module';
import { ToastModule } from '../shared/toast/toast.module';
import { CreateLessonComponent } from './create/lesson/lesson.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    CreateCourseComponent,
    AdminDashboardComponent,
    CreateLessonComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ErrorAlertModule,
    ToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'assets/tinymce/tinymce.min.js' }
  ]
})
export class AdminModule { }