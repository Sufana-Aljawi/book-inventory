import { TestBed } from '@angular/core/testing';

import { BookAuthorService } from './book-author.service';

describe('BookAuthorService', () => {
  let service: BookAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
