import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormContainer } from './base-form-container';

describe('BaseFormContainer', () => {
  let component: BaseFormContainer;
  let fixture: ComponentFixture<BaseFormContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseFormContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
