import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMilesForm } from './empty-miles-form';

describe('EmptyMilesForm', () => {
  let component: EmptyMilesForm;
  let fixture: ComponentFixture<EmptyMilesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyMilesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyMilesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
