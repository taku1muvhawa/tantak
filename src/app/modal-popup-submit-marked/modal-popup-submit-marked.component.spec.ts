import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupSubmitMarkedComponent } from './modal-popup-submit-marked.component';

describe('ModalPopupSubmitMarkedComponent', () => {
  let component: ModalPopupSubmitMarkedComponent;
  let fixture: ComponentFixture<ModalPopupSubmitMarkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPopupSubmitMarkedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPopupSubmitMarkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
