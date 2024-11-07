import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageOneComponent } from './landing-page-one.component';

describe('LandingPageOneComponent', () => {
  let component: LandingPageOneComponent;
  let fixture: ComponentFixture<LandingPageOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
