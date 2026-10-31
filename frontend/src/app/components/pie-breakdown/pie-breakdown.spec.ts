import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieBreakdown } from './pie-breakdown';

describe('PieBreakdown', () => {
  let component: PieBreakdown;
  let fixture: ComponentFixture<PieBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieBreakdown],
    }).compileComponents();

    fixture = TestBed.createComponent(PieBreakdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
