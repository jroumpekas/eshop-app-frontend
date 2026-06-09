import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Discounts } from './discounts';

describe('Discounts', () => {
  let component: Discounts;
  let fixture: ComponentFixture<Discounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Discounts],
    }).compileComponents();

    fixture = TestBed.createComponent(Discounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
