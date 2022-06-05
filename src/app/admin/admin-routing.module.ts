import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { CreateCourseComponent } from './create/course/course.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [  
  {
    path: 'admin', children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'courses/new', component: CreateCourseComponent},
      { path: 'courses/:id', component: CreateCourseComponent}
    ], canActivateChild: [AdminGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
