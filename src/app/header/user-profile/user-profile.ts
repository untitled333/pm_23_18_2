import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

  @Input() isLoggedIn!: boolean;

  @Input() note!: string;

  @Input() someinfo1!: string;
  @Input() someinfo2!: string;
  @Input() someinfo3!: string;
}
