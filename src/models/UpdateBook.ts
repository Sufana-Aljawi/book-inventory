export interface UpdateBook {
  id: number;
  title: string;
  isbn?: string;
  yearPublished: number;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  authorIds: number[];
}
