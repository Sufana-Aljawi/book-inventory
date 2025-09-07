import { Author } from './author';
//It match the dto of create a book in the backend
export interface Book {
  id: number;
  title: string;
  isbn: string;
  yearPublished: number;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  authors: Author[];
}
