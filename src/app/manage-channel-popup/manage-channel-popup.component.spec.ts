import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelPopupComponent } from './manage-channel-popup.component';

describe('ManageChannelPopupComponent', () => {
  let component: ManageChannelPopupComponent;
  let fixture: ComponentFixture<ManageChannelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageChannelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
