import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from '../../models/book';
import { map } from 'rxjs/operators';
import { UpdateBook } from '../../models/UpdateBook';
import { BookPaginatedResponse } from '../../models/BookPaginatedResponse';
import { HttpParams } from '@angular/common/http';
import { BooksByYear } from '../../models/BooksByYear';
import { BookWithAuthors } from '../../models/BookWithAuthors';
import { AuthorBookCount} from '../../models/AuthorBookCount'


@Injectable({
  providedIn: 'root'
})
export class bookService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  // GET: Get all books with pagination
  getBooks(page: number, size: number) {
  return this.http.get<BookPaginatedResponse<Book>>(
    `${environment.apiUrl}/books?page=${page}&size=${size}`
  );
  }

  // Create a book with authors & optional image
  createBook(formData: FormData): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/create/book`, formData);
  }

  // Update a book with Authors and optional image
  updateBook(book: UpdateBook): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${book.id}`, book);
  }
  //Delete a book by ID
  deleteBook(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Get a book by ID
  getBookById(id: number): Observable<Book> {
  return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  //Get books by year with count
  getBooksCountByYear(): Observable<BooksByYear[]> {
  return this.http.get<BooksByYear[]>(`${this.apiUrl}/stats/by-year`);
  }

  // Get total number of books
  getTotalBooks():Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  // Get top 6 expensive books
  getTopExpensiveBooks(top: number = 6): Observable<BookWithAuthors[]> {
    return this.http.get<BookWithAuthors[]>(`${this.apiUrl}/stats/top-expensive?count=${top}`);
  }
  // Get Top Authors 
  getTopAuthorsByBookCount(top: number = 6): Observable<AuthorBookCount[]>{
    return this.http.get<AuthorBookCount[]>(`${this.apiUrl}/stats/top-authors?count=${top}`);
  }
}