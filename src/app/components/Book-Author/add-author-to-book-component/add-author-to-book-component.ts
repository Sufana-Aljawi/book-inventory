import { Component , OnInit} from '@angular/core';
import { BookAuthorService } from '../../../services/book-author.service';
import { addAuthorToBook } from '../../../../models/AddAuthorToBook';
import { CommonModule } from '@angular/common';
import { bookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { Book } from '../../../../models/book';
import { Author } from '../../../../models/author';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-author-to-book-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-author-to-book-component.html',
  styleUrls: ['./add-author-to-book-component.css'],
  standalone : true
})
export class AddAuthorToBookComponent implements OnInit {
  books : Book[] = [];
  authors : Author[] = [];

  selectedBookId : number | null = null; 
  selectedAuthorId : number | null = null;

  message : string | null = null;
  success : boolean = false;

  page = 1;
  pageSize = 20;
  totalPages =0;
  totalItems = 0;


  constructor(
    private bookAuthorService: BookAuthorService,
    private bookServices : bookService,
    private authorServices : AuthorService,
  ){}
  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();

  }

  private loadBooks(): void{
    this.bookServices.getBooks(1, 100).subscribe({
      next: (data) => {
        this.books = data.items;
      },
      error: (err) => console.error('Error fetching books', err)
      })
  }

  private loadAuthors(): void {
  this.authorServices.getAuthors(this.page, this.pageSize).subscribe({
    next: (res) => {
      this.authors = res.data; // <-- this is the key part
      this.totalPages = res.totalPages;
      this.totalItems = res.totalCount;
    },
    error: (err) => console.error('Error fetching authors', err)
  });
}


  assignAuthor(bookId: number, authorId: number): void {
  if (!bookId || !authorId) return; // safety check

  this.bookAuthorService.addAuthorToBook(bookId, authorId).subscribe({
    next: () => {
      this.message = 'Author assigned successfully!';
      this.success = true;
    },
    error: (err) => {
      this.message = 'Failed to assign author.';
      this.success = false;
      console.error(err);
    }
  });
}

}
