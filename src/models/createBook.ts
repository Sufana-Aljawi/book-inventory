//It match the dto of create a book in the backend
export interface CreateBook {
  title: string;
  isbn: string;
  yearPublished: number;
  price: number;
  stockQuantity: number;
  imageUrl?: string;  // optional
  authorIds: number[]; // selected author IDs
}
