import { BookAuthor } from './bookAuthor';

export interface Author {
  id: number;
  name: string;
  bookAuthors: BookAuthor[];
}
