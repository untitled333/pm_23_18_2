import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { ExpertiseItem } from '../../models/cv.model';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss',
})
export class ExpertiseComponent implements OnInit {
  skills: ExpertiseItem[] = [];
  isVisible = false;
  error: string | null = null;

  constructor(
    private cvService: CvService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cvService.getExpertise().subscribe({
      next: (data) => {
        this.skills = data;
        this.isVisible = true;
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.error = err.message;
        this.isVisible = false;
        this.cdr.detectChanges();
      },
    });
  }
}
