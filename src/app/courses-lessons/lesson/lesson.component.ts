import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/shared/models/course/course';
import { CourseLessonService } from '../course-lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  public lesson$: Observable<Lesson> = new Observable();
  constructor(private courseLessonService: CourseLessonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    if (lessonId)
      this.lesson$ = this.courseLessonService.lessonById$(lessonId);
  }

}
