// src/app/components/top-authors/top-authors-by-book-count.component.ts
import { Component, OnInit } from '@angular/core';
import { bookService } from '../../../services/book.service';
import { AuthorBookCount } from './../../../../models/AuthorBookCount'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-authors-by-book-count',
  templateUrl: './top-authors-by-book-count-component.html',
  imports:[CommonModule],
  styleUrls: ['./top-authors-by-book-count-component.css'],
  standalone : true,
})
export class TopAuthorsByBookCountComponent implements OnInit {
  authors: AuthorBookCount[] = [];
  loading = false;
  errorMessage = '';

  constructor(private bookService: bookService) {}

  ngOnInit(): void {
    this.fetchTopAuthors();
  }

  fetchTopAuthors(top: number = 6): void {
    this.loading = true;
    this.bookService.getTopAuthorsByBookCount(top).subscribe({
      next: (data) => {
        this.authors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load top authors';
        this.loading = false;
      }
    });
  }
}
