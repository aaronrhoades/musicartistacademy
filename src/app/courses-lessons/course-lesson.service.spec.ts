import { TestBed } from '@angular/core/testing';

import { CourseLessonService } from './course-lesson.service';

describe('CourseLessonService', () => {
  let service: CourseLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
