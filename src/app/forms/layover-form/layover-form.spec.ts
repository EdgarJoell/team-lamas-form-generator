import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoverForm } from './layover-form';

describe('LayoverForm', () => {
  let component: LayoverForm;
  let fixture: ComponentFixture<LayoverForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoverForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoverForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
