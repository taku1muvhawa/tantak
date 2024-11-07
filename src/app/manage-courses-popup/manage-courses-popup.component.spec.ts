import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoursesPopupComponent } from './manage-courses-popup.component';

describe('ManageCoursesPopupComponent', () => {
  let component: ManageCoursesPopupComponent;
  let fixture: ComponentFixture<ManageCoursesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCoursesPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCoursesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
