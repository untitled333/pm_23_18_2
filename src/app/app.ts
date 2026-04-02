import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Header} from './header/header';
import {Leftfooter} from './leftfooter/leftfooter';
import {Rightfooter} from './rightfooter/rightfooter';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Header, Leftfooter, Rightfooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  showExperience = false;

  toggleExperience() {
    console.log("APP TOGGLE");
    this.showExperience = !this.showExperience;
  }
}
