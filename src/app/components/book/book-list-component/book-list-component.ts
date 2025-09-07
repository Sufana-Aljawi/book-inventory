import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//MODELS
import { Book } from '../../../../models/book';
import { Author } from '../../../../models/author';
import { BookPaginatedResponse } from '../../../../models/BookPaginatedResponse';
//SERVICES
import { AuthorService } from '../../../services/author.service'; 
import { bookService } from '../../../services/book.service';
//COMPONENTS
import { BookFormComponent } from '../book-form-component/book-form-component';
import { BooksByYearComponent } from '../books-by-year-component/books-by-year-component';
import { TopExpensiveBooksComponent } from '../top-expensive-books-component/top-expensive-books-component';
import { TopAuthorsByBookCountComponent } from '../top-authors-by-book-count-component/top-authors-by-book-count-component';

@Component({
  selector: 'app-book-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  
  templateUrl: './book-list-component.html',
  styleUrls: ['./book-list-component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  authors: Author[] = [];
  bookForm!: FormGroup;
  selectedBookId: number | null = null;
  isModalOpen: boolean = false;
  @Input() bookIdToEdit!: number;
  filteredBooks: Book[] = [];  
  searchTerm: string = '';
  stockSortAsc : boolean = false;
  priceSortAsc: boolean = false; 
  pageNumber = 1;
  pageSize = 20;
  totalPages = 0;
  totalItems = 0;
  totalBooks: number = 0;


  constructor(
    private bookService: bookService,
    private authorService: AuthorService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      yearPublished: [new Date().getFullYear(), Validators.required],
      price: [0, Validators.required],
      stockQuantity: [0, Validators.required],
      authors: [[]] // this holds selected Author objects
    });
  }

  ngOnInit(): void {
    
    this.loadBooks();
    this.loadAuthors();
    this.loadTotalBooks();
  }

  // Updated to load books 
  loadBooks(page: number = 1): void {
  const search = this.searchTerm?.trim() || undefined;

  this.bookService.getBooks(page, this.pageSize)
    .subscribe({
      next: (res) => {
        this.books = res.items;
        this.filteredBooks = res.items;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
        this.totalItems = res.totalItems;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.books = [];
        this.filteredBooks = [];
      }
    });
}

// Load total books count
loadTotalBooks(): void {
  this.bookService.getTotalBooks().subscribe({
    next: total => this.totalBooks = total,
    error: err => console.error('Failed to load total books', err)
  });
}

// Navigate to next page
onNextPage(): void {
  if (this.pageNumber < this.totalPages) {
    this.loadBooks(this.pageNumber + 1);
  }
}

// Navigate to previous page
onPrevPage(): void {
  if (this.pageNumber > 1) {
    this.loadBooks(this.pageNumber - 1);
  }
}

// Filter books based on search term
searchBooks(): void {
  const term = this.searchTerm.trim().toLowerCase();
  this.filteredBooks = this.books.filter(b =>
    b.title.toLowerCase().includes(term) ||
    b.authors.some(a => a.name.toLowerCase().includes(term))
  );
  this.pageNumber = 1; // reset pagination if needed
}

// Load all authors for the multi-select dropdown

private loadAuthors(): void {
  this.authorService.getAuthors(this.pageNumber, this.pageSize).subscribe({
    next: (res) => {
      this.authors = res.data; // <-- this is the key part
      this.totalPages = res.totalPages;
      this.totalItems = res.totalCount;
    },
    error: (err) => console.error('Error fetching authors', err)
  });
}
  
//delete a book with id
deleteBook(id: number): void {
    const book = this.books.find(b => b.id === id);
    if (!book) return alert('Book not found.');
    if (book.stockQuantity > 0) return alert('❌ Cannot delete a book with stock quantity.');
    if (book.authors?.length) return alert('❌ Cannot delete a book that has authors.');

    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(this.pageNumber),
        error: err => alert(err?.error?.message || 'Failed to delete book.')
      });
    }
  }

// Open modal to confirm deletion
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedBookId = null;
  }

  // Nvigate to top authors by book 
  topAuthorByBookCount(){
    this.router.navigate(['/books/top-authors'])
  }
  // Navigate to top expensive books page
  topExpensiveBooks(){
    this.router.navigate(['/books/top-expensive']);
  }
  // Navigate to books by year page
  booksByYear(){
    this.router.navigate(['/books/by/year']);
  }

  // Navigate to create book page
    createBook() {
    this.router.navigate(['/create/book']);
  }
  // Navigate to edit book page
  editBook(id: number): void {
    this.router.navigate(['/edit/book', id]); 
  }
  // Helper to get comma-separated author names for display
  getAuthorNames(book: Book): string {
    return book.authors?.map(a => a.name).join(', ') || '-';
  }
// Method to sort books by stock quantity and price
sortBooks(by: 'price' | 'stock'): void {
  if (by === 'stock') {
    this.stockSortAsc = !this.stockSortAsc;
    this.filteredBooks.sort((a,b)=> this.stockSortAsc ? a.stockQuantity - b.stockQuantity : b.stockQuantity - a.stockQuantity);
  } else if (by === 'price') {
    this.priceSortAsc = !this.priceSortAsc;
    this.filteredBooks.sort((a,b)=> this.priceSortAsc ? a.price - b.price : b.price - a.price);
  }
}
// Method to go to a specific page
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.pageNumber = page;
    this.loadBooks(); // reload or re-filter your books
  }
}

}
