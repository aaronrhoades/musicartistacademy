import { Component, OnInit } from '@angular/core';
import { Course, Lesson } from 'src/app/shared/models/course/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentLessons: Lesson[] = []
  myCourses: Course[] = []
  
  constructor() { 
  }
  
  ngOnInit(): void {
    this.recentLessons = [{
      id: "",
      teacherIds: [],
      body: '',
      title: 'My Lesson',
      featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2021/06/2020_02_27_KikiVassilakis_AaronRhodes_LG-1-of-10-819x1024.jpg',
      postType: 'lesson',
      description: 'Testing 1 2 3'
    },
    {
      id: "",
      teacherIds: [],
      body: '',
      title: 'My Lesson 2',
      featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2021/06/2020_02_27_KikiVassilakis_AaronRhodes_LG-1-of-10-819x1024.jpg',
      postType: 'lesson',
      description: 'Testing 1 2 3'
    },
    {
      id: "",
      teacherIds: [],
      body: '',
      title: 'My Lesson 3',
      featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2021/06/2020_02_27_KikiVassilakis_AaronRhodes_LG-1-of-10-819x1024.jpg',
      postType: 'lesson',
      description: 'Testing 1 2 3'
    }];
    this.myCourses = [{
      id: '',
      title: 'Becoming a Music Artist',
      body: '',
      description: '',
      featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2021/06/2020_02_27_KikiVassilakis_AaronRhodes_LG-1-of-10-819x1024.jpg',
      lessonIds: ['test'],
      postType: 'course',
    }];
  }
}
