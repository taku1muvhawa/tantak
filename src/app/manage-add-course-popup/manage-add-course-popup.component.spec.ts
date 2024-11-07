import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddCoursePopupComponent } from './manage-add-course-popup.component';

describe('ManageAddCoursePopupComponent', () => {
  let component: ManageAddCoursePopupComponent;
  let fixture: ComponentFixture<ManageAddCoursePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAddCoursePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAddCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
