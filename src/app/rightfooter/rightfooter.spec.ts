import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rightfooter } from './rightfooter';

describe('Rightfooter', () => {
  let component: Rightfooter;
  let fixture: ComponentFixture<Rightfooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rightfooter],
    }).compileComponents();

    fixture = TestBed.createComponent(Rightfooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
