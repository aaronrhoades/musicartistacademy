import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CourseLessonService } from 'src/app/courses-lessons/course-lesson.service';
import { AuthService } from 'src/app/login/auth.service';
import { Course } from 'src/app/shared/models/course/course';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  isNewCourse: boolean = true;
  errors: string[] = [];

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
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId && classId != null) {
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
  }
  saveCourse() {
    this.errors = [];
    if (!this.isNewCourse){
      this.updateCourse(this._id.value)
      return;
    }

    let formValue = this.form.value as Course;
    delete formValue._id; //to avoid errors in BE;
    console.log(this.form.value);

    this.adminService.saveCourse$(formValue).subscribe({
      next: res => {
        // if (res.body?.){}
        if(res === null){
          this.errors.push('Error communicating with the server, please try again.');
        }        
        console.log('success', res)
      },
      error: err => {
        if(err.status === 401) {
          this.authService.logout();
          this.authService.errors.next(['Sorry, your session has expired. Please log in again.']);
          this.router.navigate(['login']);
        }
      },
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