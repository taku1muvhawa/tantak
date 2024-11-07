import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTwoComponent } from './landing-page-two.component';

describe('LandingPageTwoComponent', () => {
  let component: LandingPageTwoComponent;
  let fixture: ComponentFixture<LandingPageTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
