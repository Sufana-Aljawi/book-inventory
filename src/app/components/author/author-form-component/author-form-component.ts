import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../../models/author';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-author-form-component',
  templateUrl: './author-form-component.html',
  styleUrls: ['./author-form-component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class AuthorFormComponent implements OnInit , OnChanges {
  @Input() author: Author = { id: 0, name: '', bookAuthors: [] };
  @Output() saved = new EventEmitter<Author>();
  @Output() canceled = new EventEmitter<void>();
  
  message: string = '';
  isEditMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['author']) {
      this.isEditMode = this.author && this.author.id > 0;
    }
  }

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.isEditMode = this.author && this.author.id > 0;
  }


//Method to save the author 
 saveAuthor(): void {
  if (!this.author.name.trim()) {
    this.message = 'Author name is required.';
    return;
  }
    console.log('Saving author:', this.author);

  if (this.isEditMode) {
    this.authorService.updateAuthor(this.author).subscribe({
      next: (updated) => {
        this.message = `✅ Author "${this.author.name}" updated successfully.`;
        this.saved.emit(this.author);
      },
      error: (err) => {
        console.error('Update Faild',err);
      }
    });
  } else {
    this.authorService.createAuthor(this.author).subscribe({
      next: (created) => {
        this.message = `✅ Author "${created.name}" created successfully.`;
        this.saved.emit(created);
      },
      error: (err) => {
        this.message = '❌ Error creating author.';
        console.error(err);
      }
    });
  }
}
  cancel(): void {
    this.canceled.emit();
  }

}
