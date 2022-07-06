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
 
  constructor(private http: HttpClient) { }

  public courseById$(id: string): Observable<Course> {
    return this.http.get<Course>(environment.api + "/courses/" + id)
  }

  public lessonById$(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(environment.api + "/lessons/" + id)
  }

  public coursesByUserId$(): Observable<any> {
    return this.http.get(environment.api + "/courses/");
  } 

  public coursesByTeacherId$(): Observable<any> {
    return this.http.get(environment.api + "/courses/");
  } 

  public lessonsByUserId$(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(environment.api + "/lessons/");
  }

  public lessonsByTeacherId$(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(environment.api + "/lessons/");
  }
}