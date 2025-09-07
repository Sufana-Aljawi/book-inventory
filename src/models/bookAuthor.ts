export interface BookAuthor {
  bookId: number;
  book: string; 

  authorId: number;
  author: string; 
}

export interface BookAuthorPaginatedResponse<T> {
  page : number;
  pageSize : number;
  totalCount : number;
  totalPages: number;
  data: T[];
}