import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class InfoComponent {

  @Input() isVisible: boolean = true;
  @Input() info: any[] = [];
}