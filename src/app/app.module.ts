import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './courses-lessons/dashboard/dashboard.component';
import { CourseComponent } from './courses-lessons/course/course.component';
import { LessonComponent } from './courses-lessons/lesson/lesson.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './blog/post/post.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './user/auth.interceptor';
import { PageNotFoundComponent } from './system/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './system/unauthorized/unauthorized.component';
import { AdminModule } from './admin/admin.module';
import { ErrorAlertModule } from './shared/error-alert/error-alert.module';
import { ToastModule } from './shared/toast/toast.module';
import { UserAccountComponent } from './user/account/user-account.component';
import { UserSettingsComponent } from './user/account/settings/user-settings.component';
import { UserBillingComponent } from './user/account/billing/user-billing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CourseComponent,
    LessonComponent,
    BlogComponent,
    PostComponent,
    HomePageComponent,
    AboutComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    UserAccountComponent,
    UserSettingsComponent,
    UserBillingComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorAlertModule,
    ToastModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
