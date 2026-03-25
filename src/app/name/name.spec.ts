import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameComponent } from './name';

describe('Name', () => {
  let component: NameComponent;
  let fixture: ComponentFixture<NameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
