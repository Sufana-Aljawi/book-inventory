import { Component , OnInit} from '@angular/core';
import { BookWithAuthors } from '../../../../models/BookWithAuthors';
import { bookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-expensive-books-component',
  imports: [CommonModule],
  templateUrl: './top-expensive-books-component.html',
styleUrls: ['./top-expensive-books-component.css'],
standalone :true,
})
export class TopExpensiveBooksComponent implements OnInit {
  books: BookWithAuthors[] = [];
  loading = false;
  errorMessage = '';

  constructor(private bookService: bookService) {}

  ngOnInit(): void {
    this.fetchTopExpensiveBooks();
  }

  fetchTopExpensiveBooks(): void {
    this.loading = true;
    this.bookService.getTopExpensiveBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load top books';
        this.loading = false;
      },
    });
  }
}
