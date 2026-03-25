import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expertise',
  standalone: true,
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss',
})
export class ExpertiseComponent {

  @Input() isVisible: boolean = true;
  @Input() title: string = '';
  @Input() skills: string[] = [];
}