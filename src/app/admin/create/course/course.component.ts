import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLessonService } from 'src/app/courses-lessons/course-lesson.service';
import { AuthService } from 'src/app/user/auth.service';
import { Course, Lesson } from 'src/app/shared/models/course/course';
import { ToastService } from 'src/app/shared/toast/toast.service';
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
    videoUrl: this.fb.control(''),
    description: this.fb.control(''),
    body: this.fb.control(''),
    modules: this.fb.array([])
  });

  get _id() { return this.form.get('_id') as FormControl }
  get title() { return this.form.get('title') as FormControl }
  get modules() { return this.form.get('modules') as FormArray }
  getLessonIds(index: number) : FormArray {return (this.modules.controls[index] as FormGroup)?.get('lessonIds') as FormArray}

  constructor(
    private fb: FormBuilder,
    private courseService: CourseLessonService,
    private adminService: AdminService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId && classId != null) {
      this.isNewCourse = false;
      this.courseService.courseById$(String(classId)).subscribe({
          next: res => {
            let course = res as Course;
            this.form.patchValue(course);
            course.modules.forEach((x, i) => {
              this.modules.push(this.fb.group({
                ...x,
                lessonIds: this.fb.array(x?.lessonIds as Array<Lesson>)
              }))
            });
          }
        });
    }
  }

  addModule() {
    let newModule = this.fb.group({
      title: [''],
      description: [''],
      videoUrl: [''],
      lessonIds: this.fb.array([''])
    });

    this.modules.push(newModule);
  }

  removeModule(index: number) {
    this.modules.removeAt(index);
  }

  addLesson(index: number) {
    let lessons = this.modules.get(String(index))?.get('lessonIds') as FormArray;
    lessons.push(this.fb.control(''));
  }

  removeLesson(index: number, ind: number) {
    let lessons = this.modules.get(String(index))?.get('lessonIds') as FormArray;
    lessons.removeAt(ind);
  }

  saveCourse() {
    this.errors = [];
    if(!this.form.valid){
      this.errors.push('Form is invalid. Please check fields.');
      return;
    }
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
        else if (res._id) {
          this.toastService.newToast('Course created successfully');
          this.router.navigate(['admin/courses', res._id]);
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
  updateCourse(_id: string) {
    this.adminService.updateCourse$(_id, this.form.value as Course).subscribe(
      {
        next: res => {
          if(res._id)
            this.toastService.newToast('Changes saved successfully');
        },
        error: err => { console.log(err) }
    });
  }
}