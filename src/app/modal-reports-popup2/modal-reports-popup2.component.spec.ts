import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportsPopup2Component } from './modal-reports-popup2.component';

describe('ModalReportsPopup2Component', () => {
  let component: ModalReportsPopup2Component;
  let fixture: ComponentFixture<ModalReportsPopup2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReportsPopup2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalReportsPopup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
