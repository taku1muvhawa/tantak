import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAssignmentComponent } from './upload-assignment.component';

describe('UploadAssignmentComponent', () => {
  let component: UploadAssignmentComponent;
  let fixture: ComponentFixture<UploadAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
