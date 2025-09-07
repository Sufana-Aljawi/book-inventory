export interface Users {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

export interface AuthPaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}