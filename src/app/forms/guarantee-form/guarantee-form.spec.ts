import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeForm } from './guarantee-form';

describe('GuaranteeForm', () => {
  let component: GuaranteeForm;
  let fixture: ComponentFixture<GuaranteeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranteeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GuaranteeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
