import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpopupSubscribeComponent } from './modalpopup-subscribe.component';

describe('ModalpopupSubscribeComponent', () => {
  let component: ModalpopupSubscribeComponent;
  let fixture: ComponentFixture<ModalpopupSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalpopupSubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalpopupSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
