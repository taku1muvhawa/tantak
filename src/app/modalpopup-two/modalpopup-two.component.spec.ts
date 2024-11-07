import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpopupTwoComponent } from './modalpopup-two.component';

describe('ModalpopupTwoComponent', () => {
  let component: ModalpopupTwoComponent;
  let fixture: ComponentFixture<ModalpopupTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalpopupTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalpopupTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
