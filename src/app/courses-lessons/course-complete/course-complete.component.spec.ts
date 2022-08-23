import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompleteComponent } from './course-complete.component';

describe('CourseCompleteComponent', () => {
  let component: CourseCompleteComponent;
  let fixture: ComponentFixture<CourseCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
