import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interests',
  standalone: true,
  templateUrl: './interests.html',
  styleUrl: './interests.scss',
})
export class InterestsComponent {

  @Input() isVisible: boolean = true;
  @Input() interests: any[] = [];
}