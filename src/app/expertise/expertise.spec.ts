import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseComponent } from './expertise';

describe('Expertise', () => {
  let component: ExpertiseComponent;
  let fixture: ComponentFixture<ExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertiseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
