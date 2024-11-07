import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupSubmitAssignmentComponent } from './modal-popup-submit-assignment.component';

describe('ModalPopupSubmitAssignmentComponent', () => {
  let component: ModalPopupSubmitAssignmentComponent;
  let fixture: ComponentFixture<ModalPopupSubmitAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPopupSubmitAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPopupSubmitAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
