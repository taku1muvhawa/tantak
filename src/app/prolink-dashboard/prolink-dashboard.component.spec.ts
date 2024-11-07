import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProlinkDashboardComponent } from './prolink-dashboard.component';

describe('ProlinkDashboardComponent', () => {
  let component: ProlinkDashboardComponent;
  let fixture: ComponentFixture<ProlinkDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProlinkDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProlinkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
