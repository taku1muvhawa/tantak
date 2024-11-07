import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPerfomanceComponent } from './student-perfomance.component';

describe('StudentPerfomanceComponent', () => {
  let component: StudentPerfomanceComponent;
  let fixture: ComponentFixture<StudentPerfomanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPerfomanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
