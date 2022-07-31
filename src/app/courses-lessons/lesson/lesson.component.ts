import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Course, Lesson } from 'src/app/shared/models/course/course';
import { CourseLessonService } from '../course-lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, OnChanges {
  public lesson$: Observable<Lesson> = new Observable();
  public course$: Observable<Course> = new Observable();
  public nextLessonId: string = '';
  public course: Course = new Course;
  public isLastLesson: boolean = false;

  constructor(private courseLessonService: CourseLessonService, private route: ActivatedRoute, private router: Router) {
   
  }

  ngOnInit(): void {
    this.loadLesson();
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.loadLesson();
    }); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.loadLesson();
  }
  loadLesson() {
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (lessonId)
      this.lesson$ = this.courseLessonService.lessonById$(lessonId);
    if(courseId)
      this.course$ = this.courseLessonService.courseById$(courseId).pipe(
        tap(x=> {this.course = x})
      );

    let useNext = false;
    this.course$.subscribe({
      next: res => {
        res.modules.forEach(x => {
          x?.lessonIds.forEach(y => {
            if(useNext) {
              this.nextLessonId = y;
              return;
            }
            if(y === lessonId) {
              useNext = true;
            }
          })
        })
        if (!useNext)
          this.isLastLesson = true;
      }
    });
  }
}
