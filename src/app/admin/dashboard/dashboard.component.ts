import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseLessonService } from 'src/app/courses-lessons/course-lesson.service';
import { AuthService } from 'src/app/login/auth.service';
import { Course } from 'src/app/shared/models/course/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private courseLessonService: CourseLessonService
  ) { }
  declare myCourses$: Observable<Course[]>;

  ngOnInit(): void {
    let auth = this.authService.getCurrentUserTokenClient();
    console.log(auth);
    this.myCourses$ = this.courseLessonService.coursesByTeacherId$();
  }

}
