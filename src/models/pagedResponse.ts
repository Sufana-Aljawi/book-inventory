export interface PagedResponse<T> {
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  items: T[];
}
