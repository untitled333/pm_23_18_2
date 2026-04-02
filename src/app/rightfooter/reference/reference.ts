import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reference',
  standalone: true,
  templateUrl: './reference.html',
  styleUrl: './reference.scss',
})
export class ReferenceComponent {

  @Input() isVisible: boolean = true;
  @Input() references: any[] = [];
}