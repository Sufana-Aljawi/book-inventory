import { Component, OnInit } from '@angular/core';
import { bookService } from '../../../services/book.service';
import { BooksByYear } from '../../../../models/BooksByYear';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-books-by-year',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-by-year-component.html',
  styleUrls: ['./books-by-year-component.css'] // ✅ correct
})
export class BooksByYearComponent implements OnInit {
  booksByYear: BooksByYear[] = [];
  errorMessage: string = '';

  constructor(private bookService: bookService) {}

  ngOnInit(): void {
    this.loadBooksByYear();
  }

  loadBooksByYear(): void {
    this.bookService.getBooksCountByYear().subscribe({
      next: data => this.booksByYear = data,
      error: err => this.errorMessage = 'Failed to load books by year'
    });
  }


}
