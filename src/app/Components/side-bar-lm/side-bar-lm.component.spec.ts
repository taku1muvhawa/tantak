import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarLmComponent } from './side-bar-lm.component';

describe('SideBarLmComponent', () => {
  let component: SideBarLmComponent;
  let fixture: ComponentFixture<SideBarLmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarLmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarLmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
