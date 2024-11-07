import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddModulePopupComponent } from './manage-add-module-popup.component';

describe('ManageAddModulePopupComponent', () => {
  let component: ManageAddModulePopupComponent;
  let fixture: ComponentFixture<ManageAddModulePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAddModulePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAddModulePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
