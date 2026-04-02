import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceComponent } from './reference';

describe('Reference', () => {
  let component: ReferenceComponent;
  let fixture: ComponentFixture<ReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
