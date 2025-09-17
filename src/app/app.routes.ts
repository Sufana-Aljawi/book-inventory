import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './components/book/book-list-component/book-list-component';
import { BookFormComponent } from './components/book/book-form-component/book-form-component';
import { AuthorListComponent } from './components/author/author-list-component/author-list-component';
import { AuthorFormComponent } from './components/author/author-form-component/author-form-component';
import { BookAuthorComponent } from './components/Book-Author/book-author-component/book-author-component';
import { NgModule } from '@angular/core';
import { BooksByYearComponent } from './components/book/books-by-year-component/books-by-year-component';
import { TopExpensiveBooksComponent } from './components/book/top-expensive-books-component/top-expensive-books-component';
import { TopAuthorsByBookCountComponent } from './components/book/top-authors-by-book-count-component/top-authors-by-book-count-component';
import { AddAuthorToBookComponent } from './components/Book-Author/add-author-to-book-component/add-author-to-book-component';
import { AdminComponent } from './components/admin/admin-component/admin-component';
import { LoginComponent } from './components/authentication/login-component/login-component';
import { RegisterComponent } from './components/authentication/register-component/register-component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home';


export const routes: Routes = [
    {path:'books', component: BookListComponent},
    { path:'create/book', component: BookFormComponent},
    { path:'edit/book/:id', component: BookFormComponent},
    { path:'books/by/year', component: BooksByYearComponent},
    {path :'books/top-expensive', component: TopExpensiveBooksComponent},
    {path: 'books/top-authors', component: TopAuthorsByBookCountComponent},
    {path: 'authors', component: AuthorListComponent},
    {path: 'book-author', component: BookAuthorComponent},
    {path: 'book-author/add' , component : AddAuthorToBookComponent},
    { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
    {path: 'login', component : LoginComponent},
    {path: 'register', component : RegisterComponent},
    {path: '', redirectTo: '/', pathMatch: 'full' },
];

