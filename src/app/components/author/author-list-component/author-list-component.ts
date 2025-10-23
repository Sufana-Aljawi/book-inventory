import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../../models/author';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorFormComponent } from '../author-form-component/author-form-component';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { bookService } from '../../../services/book.service';
import { AuthorWithoutBooks } from '../../../../models/AuthorWithoutBooks';
import { ExperiencedAuthor } from '../../../../models/ExperiencedAuthor';
import { RecentAuthor } from '../../../../models/RecentAuthor';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list-component.html',
  styleUrls: ['./author-list-component.css'],
  imports: [CommonModule, FormsModule,AuthorFormComponent],
  standalone: true
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  selectedAuthor: Author | null = null;
  showAuthorFormModal = false;
  message: string = '';
  page = 1;
  pageSize = 20;
  totalPages =0;
  isEditMode = false;
  filteredAuthors: Author[] = [];
  searchTerm: string = '';
  totalItems = 0;
  totalAuthors = 0;
  showEditModal: boolean = false;
  author: Author = { id: 0, name: '', bookAuthors: [] };
  currentAuthor: Author = { id: 0, name: '', bookAuthors: [] };
  AuthorsWBooks: AuthorWithoutBooks[] = [];
  mostExperiencedAuthors: ExperiencedAuthor[] = [];
  RecentAuthors: RecentAuthor[] = []


  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors();
    this.loadTotalAuthors();
    this.loadMinimalAuthors();
    this.loadMostExperiencedAuthors();
    this.loadAuthorsWithRecentBooks();

  }

  loadAuthorsWithRecentBooks(){
    this.authorService.getAuthorsWithRecentBooks().subscribe({
      next: (data) => this.RecentAuthors = data,
      error: (err) => console.error('Error loading recent authors', err)
    })
  }

  loadMostExperiencedAuthors() {
  this.authorService.getMostExperiencedAuthors().subscribe({
    next: (data) => this.mostExperiencedAuthors = data,
    error: (err) => console.error('Error loading most experienced authors', err)
  });
}

loadMinimalAuthors(): void {
  this.authorService.getGetAuthorsWithoutBooks().subscribe({
    next: (authors) => this.AuthorsWBooks = authors,
    error: (err) => console.error('Failed to load minimal authors', err)
  });
}

loadTotalAuthors(): void {
    this.authorService.getTotalAuthors().subscribe({
      next: total=> this.totalAuthors = total,
    error: err => console.error('Failed to load total authors', err)
    })
  }
    // Load authors with pagination
 
private loadAuthors(): void {
  this.authorService.getAuthors(this.page, this.pageSize).subscribe({
    next: (res) => {
      this.authors = res.data; // <-- this is the key part
      this.totalPages = res.totalPages;
      this.totalItems = res.totalCount;
    },
    error: (err) => console.error('Error fetching authors', err)
  });
}
  //pagination controls 
    nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadAuthors();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadAuthors();
    }
  }

  // Method to delete an author
  deleteAuthor(id: number): void {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.deleteAuthor(id).subscribe({
        next: () => this.loadAuthors(),
        error: (err) => {
          alert(err.error?.message || 'Failed to delete author.');
        }
      });
    }
  }
  // Method to handle author selection
  viewAuthor(author: Author): void {
    this.selectedAuthor = author;
  }

  openCreateAuthorModal(): void {
    this.currentAuthor = { id: 0, name: '', bookAuthors: [] };
    this.showAuthorFormModal = true;
  }

  openEditAuthorModal(author: Author): void {
    this.currentAuthor = { ...author };
    this.showAuthorFormModal = true;
  }

  closeAuthorFormModal(): void {
    this.showAuthorFormModal = false;
  }

  // Method to handle author form submission
  onAuthorSaved(savedAuthor: Author): void {
    this.showAuthorFormModal = false;
    this.loadAuthors(); // reload list to show changes

    
  this.message = this.currentAuthor.id > 0
    ? `✅ Author "${savedAuthor.name}" updated successfully.`
    : `✅ Author "${savedAuthor.name}" created successfully.`;

  setTimeout(() => this.message = '', 3000); // auto-hide message
  }

  goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.page = page;
    this.loadAuthors(); 
  }
}
}
