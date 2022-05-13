import { Component, OnInit } from '@angular/core';
import { Course, Lesson } from 'src/app/shared/models/course/course';
import { Observable } from 'rxjs';
import { CourseLessonService } from '../course-lesson.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentLessons$: Observable<Lesson[]> = new Observable();
  myCourses$: Observable<Course[]> = new Observable();
  
  constructor(private courseLessonService: CourseLessonService) {
  }
  
  ngOnInit(): void {
    this.myCourses$ = this.courseLessonService.userOwnedCourses$();
    this.recentLessons$ = this.courseLessonService.recentLessons$();
  }
}
