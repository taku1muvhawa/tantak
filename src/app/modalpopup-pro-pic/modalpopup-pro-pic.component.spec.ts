import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpopupProPicComponent } from './modalpopup-pro-pic.component';

describe('ModalpopupProPicComponent', () => {
  let component: ModalpopupProPicComponent;
  let fixture: ComponentFixture<ModalpopupProPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalpopupProPicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalpopupProPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
