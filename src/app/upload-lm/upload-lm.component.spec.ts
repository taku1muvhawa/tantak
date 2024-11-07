import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLMComponent } from './upload-lm.component';

describe('UploadLMComponent', () => {
  let component: UploadLMComponent;
  let fixture: ComponentFixture<UploadLMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadLMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadLMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
