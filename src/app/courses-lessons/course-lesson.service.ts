import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Lesson } from '../shared/models/course/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseLessonService {
  environment = environment;
  mockCourses: Course[] = [{
    _id: 'abcdefg',
    title: 'How to Stop Being Weird',
    body: '',
    description: 'A course in how to not be so f*cking weird.',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg'
  },
  {
    _id: 'xyzxyz',
    title: 'How to Make Good Music',
    body: '',
    description: 'A course in how to make good music.',
    featureImageUrl: 'https://www.aaronrhoades.com/wp-content/uploads/2016/12/P1440007-768x512.jpg'
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
  constructor(private http: HttpClient) { }

  public courseById$(id: string): Observable<any> {
    return this.http.get(environment.api + "/courses/" + id)
  }

  public lessonById$(id: string): Observable<Lesson> {
    let lesson: Lesson = this.mockLessons.find(x => id === x.id) || new Lesson();
    return of(lesson);
  }

  public coursesByUserId$(): Observable<any> {
    return this.http.get(environment.api + "/courses/");
  } 

  public coursesByTeacherId$(): Observable<any> {
    return this.http.get(environment.api + "/courses/");
  } 

  public recentLessons$(): Observable<Lesson[]> {
    return of(this.mockLessons);
  }
}