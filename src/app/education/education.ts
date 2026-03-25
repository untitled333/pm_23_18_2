import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class EducationComponent {

  @Input() isVisible: boolean = true;

  @Input() title: string = '';
  @Input() major: string = '';
  @Input() university: string = '';

  @Input() years1: string = '';
  @Input() years2: string = '';
}