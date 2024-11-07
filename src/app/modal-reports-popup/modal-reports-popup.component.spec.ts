import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportsPopupComponent } from './modal-reports-popup.component';

describe('ModalReportsPopupComponent', () => {
  let component: ModalReportsPopupComponent;
  let fixture: ComponentFixture<ModalReportsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReportsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalReportsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
