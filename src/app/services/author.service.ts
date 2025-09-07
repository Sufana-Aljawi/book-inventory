import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { AuthorWithoutBooks } from '../../models/AuthorWithoutBooks';
import { ExperiencedAuthor } from '../../models/ExperiencedAuthor';
import {RecentAuthor} from  '../../models/RecentAuthor'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
    private apiUrl = `${environment.apiUrl}/authors`;
  
    constructor(private http: HttpClient) {}

// Get Authors with paged
getAuthors(page: number = 1, pageSize: number = 20): Observable<{ data: Author[], totalCount: number, page: number, pageSize: number, totalPages: number }> {
  return this.http.get<{ data: Author[], totalCount: number, page: number, pageSize: number, totalPages: number }>(
    `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
  );
}

  // Get author by ID
  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   // Create new author
  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

   // Update existing author
  updateAuthor(author: Author): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${author.id}`, author);
  }
  
  // Get author by ID - not applied
  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  //Get authors = total
  getTotalAuthors(): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/total`);
}

//Get authors without books 
getGetAuthorsWithoutBooks(): Observable<AuthorWithoutBooks[]> {
  return this.http.get<AuthorWithoutBooks[]>(`${this.apiUrl}/without-books`);
}
//Get most experince 
getMostExperiencedAuthors(id: number = 6): Observable<ExperiencedAuthor[]>{
  return this.http.get<ExperiencedAuthor[]>(`${this.apiUrl}/stats/experienced-authors`);
}

getAuthorsWithRecentBooks(id:number = 6): Observable<RecentAuthor[]>{
  return this.http.get<RecentAuthor[]>(`${this.apiUrl}/stats/recent-authors`);
}
}
