import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from './user-profile/user-profile';
import { NameComponent } from './name/name';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [UserProfile, NameComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);
  private router = inject(Router);
  readonly isLoggedIn = this.auth.isLoggedIn;

  name: string = 'Mathew';
  surname: string = 'Smith';

  professions = ['Graphic', ' Web Designer'];
  note: string = 'PROFILE';

  someinfo1: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,';
  someinfo2: string = 'sed do eiusmod tempor incididunt ut labore et dolore';
  someinfo3: string = 'magna aliqua incididunt.';

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
