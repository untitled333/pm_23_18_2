import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  standalone: true,
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class NameComponent {

  @Input() isLoggedIn: boolean = false;

  @Input() name: string = '';
  @Input() surname: string = '';

  @Input() professions: string[] = [];
}