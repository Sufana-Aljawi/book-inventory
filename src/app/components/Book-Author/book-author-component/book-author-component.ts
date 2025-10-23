import { Component, OnInit } from '@angular/core';
import { BookAuthorService } from '../../../services/book-author.service';
import { BookAuthor , BookAuthorPaginatedResponse} from '../../../../models/bookAuthor';
import { bookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BookAuthorsMost } from '../../../../models/BookAuthorsMost';
import { AuthorsBooksMost } from '../../../../models/AuthorsBooksMost';
import { AddAuthorToBookComponent } from '../add-author-to-book-component/add-author-to-book-component';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-book-author-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-author-component.html',
styleUrls: ['./book-author-component.css'],
 standalone : true
})
export class BookAuthorComponent implements OnInit {
  totalBookAuthor: BookAuthor[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  books: any[] = [];
  authors: any[] = [];
  showCreateForm = false;
  selectedBookId: number | null = null;
  selectedAuthorId: number | null = null;
  pageSize = 10; // items per page
  page = 1; // current page
  totalPages = 0;
  totalItems = 0;
  booksMostAuthors: BookAuthorsMost[] = [];
  authorsMostBooks: AuthorsBooksMost[] =[];


  constructor(
    private bookAuthorService: BookAuthorService,
    private bookService: bookService,
    private authorService: AuthorService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
    this.loadBookAuthor();
    this.loadBooksMostAuthors(6);
    this.loadAuthorsMostBooks(6);
  }

  //Add author to book 
  assignAuthor(){
  this.router.navigate(['/book-author/add']); 
  }

  loadAuthorsMostBooks(top: number = 6) {
  this.bookAuthorService.getAuthorsWithMostBooks(top).subscribe({
    next: (data) => {
      this.authorsMostBooks = data;
    },
    error: (err) => console.error(err)
  });
  }
  //load most 
  loadBooksMostAuthors(top: number = 6) {
  this.bookAuthorService.getBooksWithMostAuthors(top).subscribe({
    next: (response) => {
      this.booksMostAuthors = response;
    },
    error: (err) => console.error(err)
  });
}

loadBookAuthor(): void {
  this.bookAuthorService.getBookAuthorPagination(this.page, this.pageSize).subscribe({
    next: (response: BookAuthorPaginatedResponse<BookAuthor>) => {
      this.totalBookAuthor = response.data;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalCount;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // auto-scroll
    },
    error: (err) => console.error('Error loading book authors:', err)
  });
}


// Navigate to next page
onNextPage(): void {
  if (this.page < this.totalPages) {
    this.page++;
    this.loadBookAuthor();
  }
}

// Navigate to previous page
onPrevPage(): void {
  if (this.page > 1) {
    this.page--;
    this.loadBookAuthor();
  }
}

// Method to go to a specific page
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.page = page;
    this.loadBookAuthor(); // Reload current book-author page
  }
}

//Loading Books
  loadBooks(): void {
  this.bookService.getBooks(this.page,
    this.pageSize,).subscribe({
    next: data => this.books = data.items,
    error: err => console.error('Error loading books:', err)
  });
}


// Loading Auhors
 loadAuthors(): void {
  this.authorService.getAuthors(this.page, this.pageSize).subscribe({
    next: (res) => {
      this.authors = res.data; // <-- this is the key part
      this.totalPages = res.totalPages;
      this.totalItems = res.totalCount;
    },
    error: (err) => console.error('Error fetching authors', err)
  });
}

toggleCreateForm() {
  this.showCreateForm = !this.showCreateForm;
  if (!this.showCreateForm) {
    this.selectedBookId = null;
    this.selectedAuthorId = null;
    this.errorMessage = '';
    this.successMessage = '';
  }
}

//Remove Author from book 
removeAuthor(bookId: number, authorId: number) {
  this.bookAuthorService.removeAuthorFromBook(bookId, authorId).subscribe({
    next: () => {
      // Success message
      this.successMessage = 'Author removed successfully!';
      this.errorMessage = ''; // Clear previous errors
      this.loadBookAuthor();  // Refresh the table
    },
    error: (err) => {
      console.error('Failed to remove author:', err);
      // Check if backend returned a known message
      if (err.error && typeof err.error === 'string') {
        this.errorMessage = err.error; // Show backend warning
      } else {
        this.errorMessage = 'Failed to remove author from book.';
      }
      this.successMessage = ''; // Clear previous success
    }
  });
}

confirmRemove(bookId: number, authorId: number) {
  const confirmed = confirm('Are you sure you want to remove this author from the book?');
  if (confirmed) {
    this.removeAuthor(bookId, authorId);
  }
}

}
