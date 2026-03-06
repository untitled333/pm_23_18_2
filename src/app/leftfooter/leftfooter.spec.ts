import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leftfooter } from './leftfooter';

describe('Leftfooter', () => {
  let component: Leftfooter;
  let fixture: ComponentFixture<Leftfooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leftfooter],
    }).compileComponents();

    fixture = TestBed.createComponent(Leftfooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
