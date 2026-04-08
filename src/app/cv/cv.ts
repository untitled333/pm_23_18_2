import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Leftfooter } from '../leftfooter/leftfooter';
import { Rightfooter } from '../rightfooter/rightfooter';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, Header, Leftfooter, Rightfooter],
  template: `
    <div class="container main-container px-0">
      <div class="row px-0">
        <div class="col-12 px-0">
          <app-header></app-header>
        </div>
        <div class="col-5 px-0">
          <app-leftfooter></app-leftfooter>
        </div>
        <div class="col-7 px-0">
          <app-rightfooter
            [showExperience]="showExperience"
            (toggleExperience)="toggleExperience()"
          >
          </app-rightfooter>
        </div>
      </div>
    </div>
  `,
})
export class CvComponent {
  showExperience = false;

  toggleExperience() {
    this.showExperience = !this.showExperience;
  }
}
