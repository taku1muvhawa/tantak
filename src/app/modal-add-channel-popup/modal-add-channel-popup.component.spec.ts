import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddChannelPopupComponent } from './modal-add-channel-popup.component';

describe('ModalAddChannelPopupComponent', () => {
  let component: ModalAddChannelPopupComponent;
  let fixture: ComponentFixture<ModalAddChannelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddChannelPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddChannelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
