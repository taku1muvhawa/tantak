import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAccountsComponent } from './financial-accounts.component';

describe('FinancialAccountsComponent', () => {
  let component: FinancialAccountsComponent;
  let fixture: ComponentFixture<FinancialAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
