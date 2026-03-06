import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  isLoggedIn: boolean = true;

  name: string = "Mathew";
  surname: string = "Smith";

  professions = ["Graphic", " Web Designer"];
  note: string = "PROFILE";

  someinfo1: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,";
  someinfo2: string = "sed do eiusmod tempor incididunt ut labore et dolore";
  someinfo3: string = "magna aliqua incididunt.";
}
