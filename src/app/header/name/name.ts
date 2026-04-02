import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { NameData } from '../../models/cv.model';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})

export class NameComponent implements OnInit {
  nameData: NameData | null = null;
  isLoading = true;
  error: string | null = null;

  isEditing = false;
  isSaving = false;
  saveSuccess = false;
  formData: NameData = { firstName: '', lastName: '', title: '' };

  constructor(
    private cvService: CvService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cvService.getName().subscribe({
      next: (data) => {
        this.nameData = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.error = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  openEdit(): void {
    if (!this.nameData) return;
    this.formData = { ...this.nameData };
    this.isEditing = true;
    this.saveSuccess = false;
    this.error = null;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  save(): void {
    this.isSaving = true;
    this.error = null;

    this.cvService.updateName(this.formData).subscribe({
      next: (data) => {
        this.nameData = data;
        this.isEditing = false;
        this.isSaving = false;
        this.saveSuccess = true;
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.error = err.message;
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }
}
