import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookAuthor, BookAuthorPaginatedResponse } from '../../models/bookAuthor';
import { BookAuthorsMost } from '../../models/BookAuthorsMost'
import { AuthorsBooksMost } from '../../models/AuthorsBooksMost';
import { addAuthorToBook } from '../../models/AddAuthorToBook';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookAuthorService {
  private readonly apiUrl = `${environment.apiUrl}/book-author`;

  constructor(private http: HttpClient) {}

  //Get all Books AND Authors with pagination
  getBookAuthorPagination(page: number, pageSize: number): Observable<BookAuthorPaginatedResponse<BookAuthor>> {
  const params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize);

  return this.http.get<BookAuthorPaginatedResponse<BookAuthor>>(`${this.apiUrl}/books-authors`, { params });
}


  //Get books with most authors
  getBooksWithMostAuthors(top : number = 6): Observable<BookAuthorsMost[]>{
    return this.http.get<BookAuthorsMost[]>(`${this.apiUrl}/stats/books-most-authors`);
  }

  getAuthorsWithMostBooks(top : number = 6) : Observable<AuthorsBooksMost[]>{
    return this.http.get<AuthorsBooksMost[]>(`${this.apiUrl}/stats/authors-most-books`);

  }

  addAuthorToBook(bookId: number, authorId: number): Observable<addAuthorToBook> {
    return this.http.post<addAuthorToBook>(`${this.apiUrl}/${bookId}/authors/${authorId}`,
      {} // body can be empty since all info is in URL
    );
  }

  removeAuthorFromBook(bookId: number, authorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}/authors/${authorId}`);
  }
}
