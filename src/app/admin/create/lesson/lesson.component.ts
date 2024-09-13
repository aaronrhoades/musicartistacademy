import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLessonService } from 'src/app/courses-lessons/course-lesson.service';
import { Lesson } from 'src/app/shared/models/course/course';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from 'src/app/user/auth.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {
  isNewLesson: boolean = true;
  errors: string[] = [];

  form: UntypedFormGroup = this.fb.group({
    _id: this.fb.control(''),
    title: this.fb.control('',[Validators.required]),
    featureImageUrl: this.fb.control(''),
    description: this.fb.control(''),
    body: this.fb.control(''),
    modules: this.fb.array([])
  });

  get _id() { return this.form.get('_id') as FormControl<string> }
  get title() { return this.form.get('title') as FormControl<string>}

  constructor(
    private fb: UntypedFormBuilder,
    private courseLessonService: CourseLessonService,
    private adminService: AdminService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId && lessonId != null) {
      this.isNewLesson = false;
      this.courseLessonService.lessonById$(String(lessonId)).subscribe({
        next: res => {
          let lesson = res as Lesson;
          this.form.patchValue(lesson);
        }
      });
    }
  }
  saveLesson() {
    this.errors = [];
    if(!this.form.valid){
      this.errors.push('Form is invalid. Please check fields.');
      return;
    }
    if (!this.isNewLesson){
      this.updateLesson(this._id.value)
      return;
    }

    let formValue = this.form.value as Lesson;
    delete formValue._id; //to avoid errors in BE;
    console.log(this.form.value);

    this.adminService.saveLesson$(formValue).subscribe({
      next: res => {
        // if (res.body?.){}
        if(res === null){
          this.errors.push('Error communicating with the server, please try again.');
        }        
        else if (res._id) {
          this.toastService.newToast('Course created successfully');
          this.router.navigate(['admin/lessons', res._id]);
        }
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
  updateLesson(_id: string) {
    this.adminService.updateLesson$(_id, this.form.value as Lesson).subscribe(
      {
        next: res => {
          if(res._id)
            this.toastService.newToast('Changes saved successfully');
        },
        error: err => { console.log(err) }
    });
  }
}