import { Author } from './author';

export interface BookWithAuthors {
  id: number;
  title: string;
  isbn: string;
  yearPublished: number;
  price: number;
  stockQuantity: number;
  imageUrl?: string | null;
  authors: Author[];
}