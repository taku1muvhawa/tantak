import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCourseOutlineComponent } from './upload-course-outline.component';

describe('UploadCourseOutlineComponent', () => {
  let component: UploadCourseOutlineComponent;
  let fixture: ComponentFixture<UploadCourseOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadCourseOutlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadCourseOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
