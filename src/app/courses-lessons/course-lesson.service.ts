import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Lesson } from '../shared/models/course/course';

@Injectable({
  providedIn: 'root'
})
export class CourseLessonService {
  mockCourses: Course[] = [{
    id: 'abcdefg',
    title: 'How to Stop Being Weird',
    lessonIds: ['test', 'test123'],
    body: '',
    description: 'A course in how to not be so f*cking weird.',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg',
    postType: 'course'    
  },
  {
    id: 'xyzxyz',
    title: 'How to Make Good Music',
    lessonIds: ['test', 'test123'],
    body: '',
    description: 'A course in how to make good music.',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg',
    postType: 'course'    
  }];

  mockLessons = [{
    id: "test",
    teacherIds: [],
    body: '',
    title: 'My Lesson',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg',
    postType: 'lesson',
    description: 'Testing 1 2 3'
  },
  {
    id: "test123",
    teacherIds: [],
    body: '',
    title: 'My Lesson 2',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg',
    postType: 'lesson',
    description: 'Testing 1 2 3'
  },
  {
    id: "abcdef",
    teacherIds: [],
    body: '',
    title: 'My Lesson 3',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg',
    postType: 'lesson',
    description: 'Testing 1 2 3'
  }];

  mockRecentLessons = { courseId: 'abcdefg', lessonId: 'test123' };
  constructor() { }

  public courseById$(id: string): Observable<Course> {
    let course: Course = this.mockCourses.find(x => id === x.id) || new Course();
    return of(course);
  }

  public lessonById$(id: string): Observable<Lesson> {
    let lesson: Lesson = this.mockLessons.find(x => id === x.id) || new Lesson();
    return of(lesson);
  }

  public userOwnedCourses$(): Observable<Course[]> {
    return of(this.mockCourses);
  } 

  public recentLessons$(): Observable<Lesson[]> {
    return of(this.mockLessons);
  }
}