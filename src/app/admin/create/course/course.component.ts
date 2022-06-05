import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CourseLessonService } from 'src/app/courses-lessons/course-lesson.service';
import { Course } from 'src/app/shared/models/course/course';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  isNewCourse: boolean = true;

  form: FormGroup = this.fb.group({
    _id: this.fb.control(''),
    title: this.fb.control('',[Validators.required]),
    featureImageUrl: this.fb.control(''),
    description: this.fb.control(''),
    body: this.fb.control('')
  });

  get _id() { return this.form.get('_id') as FormControl }

  constructor(
    private fb: FormBuilder,
    private courseService: CourseLessonService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId)
      this.isNewCourse = false;
      this.courseService.courseById$(String(classId)).pipe(
        tap(x => console.log(x))
      ).subscribe({
        next: res => {
          let course = res as Course;
          this.form.patchValue(course);
        }
      });
  }
  saveCourse() {
    if (!this.isNewCourse){
      this.updateCourse(this._id.value)
      return;
    }
    this.adminService.saveCourse$(this.form.value as Course).subscribe({
      next: res => {console.log('success', res)},
      error: err => {console.log(err)},
      complete: () => console.log('all set')
      
    });
  }
  updateCourse(_id: string) {
    this.adminService.updateCourse$(_id, this.form.value as Course).subscribe(
      {
        next: res => { console.log(res) },
        error: err => { console.log(err) }
    });
  }
}