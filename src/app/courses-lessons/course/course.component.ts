import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Course } from 'src/app/shared/models/course/course';
import { CourseLessonService } from '../course-lesson.service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  public environment = environment;
  public course$: Observable<Course> = new Observable();
  constructor(
    private courseLessonService: CourseLessonService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId)
      this.course$ = this.courseLessonService.courseById$(classId).pipe(
        tap(x => console.log(x))
      );
  }
}
