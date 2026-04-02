import { Component } from '@angular/core';
import { EducationComponent } from './education/education';
import { ExpertiseComponent } from './expertise/expertise';
import { InfoComponent } from './info/info';

@Component({
  selector: 'app-leftfooter',
  imports: [EducationComponent, ExpertiseComponent, InfoComponent],
  templateUrl: './leftfooter.html',
  styleUrl: './leftfooter.scss',
})
export class Leftfooter {

  idk1: boolean = true;

  title1: string = "EDUCATION";
  text1: string = "ENTER YOUR MAJOR";
  text2: string = "Name Of Your University";
  years1: string = "2005-2009";
  years2: string = "2009-2011";

  idk2: boolean = true;

  title2: string = "EXPERTISE";
  skills = ["Photoshop", "Illustrator", "Indesign", "Word", "Power Point"];

  idk3: boolean = true;

  info = [
  { title: "PHONE", value: "+000 123 456 789" },
  { title: "EMAIL", value: "urname@gmail.com" },
  { title: "AREA", value: "Your Street Address Here" }
];

}
