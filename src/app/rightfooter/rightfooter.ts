import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rightfooter',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './rightfooter.html',
  styleUrl: './rightfooter.scss',
})
export class Rightfooter {

  showReferences: boolean = true;
  showInterests: boolean = true;

  references = [
    {
      name: "Glenin M. Gregory",
      position: "Director Marix Media Ltd.",
      phone: "+555 987 093"
    },
    {
      name: "Jennifer S. Gavin",
      position: "Director Marix Media Ltd.",
      phone: "+555 123 454"
    }
];

  interests = [
  { name: "Travel", icon: "fas fa-plane" },
  { name: "Music", icon: "fas fa-music" },
  { name: "Writing", icon: "fas fa-pen-nib" },
  { name: "Chess", icon: "fas fa-chess" }
];

  @Input() showExperience: boolean = false;

  @Output() toggleExperience = new EventEmitter<void>();

  onArrowClick() {
    console.log("CLICK WORKS");
    this.toggleExperience.emit();
 
  }

}
