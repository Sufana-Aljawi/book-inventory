import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { bookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form-component',
  templateUrl: './book-form-component.html',
  styleUrls: ['./book-form-component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  authors: any[] = [];
  successMessage = '';
  errorMessage = '';
  isEditMode = false;
  @Input() bookIdToEdit!: number;
  @Output() formClosed = new EventEmitter<void>();
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  pageNumber = 1;
  pageSize = 20;
  totalPages = 0;
  totalItems = 0;

  constructor(
    private fb: FormBuilder,
    private bookService: bookService,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAuthors();
  }

  private initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.minLength(10), Validators.maxLength(13)]],
      yearPublished: [2024, [Validators.required, Validators.min(1000), Validators.max(9999)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([this.createAuthorFormGroup()])
    });
  }


private loadAuthors(): void {
  this.authorService.getAuthors(this.pageNumber, this.pageSize).subscribe({
    next: (res) => {
      this.authors = res.data; // <-- this is the key part
      this.totalPages = res.totalPages;
      this.totalItems = res.totalCount;
    },
    error: (err) => console.error('Error fetching authors', err)
  });
}

// Load book data if in edit mode
  private loadBookIfEdit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (!idFromRoute) return;

    this.isEditMode = true;
    this.bookIdToEdit = +idFromRoute;

    this.bookService.getBookById(this.bookIdToEdit).subscribe({
      next: book => {
        this.bookForm.patchValue({
          title: book.title,
          isbn: book.isbn,
          yearPublished: book.yearPublished,
          price: book.price,
          stockQuantity: book.stockQuantity
        });

        // Clear and patch authors
        this.authorsFormArray.clear();
        if (book.authors && book.authors.length > 0) {
          book.authors.forEach(a => this.authorsFormArray.push(this.createAuthorFormGroup(a.id)));
        } else {
          this.authorsFormArray.push(this.createAuthorFormGroup());
        }

        if (book.imageUrl) this.imagePreviewUrl = book.imageUrl;
      },
      error: () => (this.errorMessage = 'Failed to load book for editing')
    });
  }

  onSubmit(): void {
    this.isEditMode ? this.updateBook() : this.createBook();
  }

  // create book
  createBook(): void {
    if (this.bookForm.invalid) return;

    const formData = this.buildFormData();
    this.bookService.createBook(formData).subscribe({
      next: () => {
        this.successMessage = 'Book created successfully!';
        this.router.navigate(['/books']);
      },
      error: err => {
        this.errorMessage = 'Failed to create book';
        console.error(err);
      }
    });
  }

  // Build payload for update
  private buildUpdatePayload(): any {
  const value = this.bookForm.value;
  return {
    id: this.bookIdToEdit,
    title: value.title,
    isbn: value.isbn,
    yearPublished: value.yearPublished,
    price: value.price,
    stockQuantity: value.stockQuantity,
    authorIds: this.authorsFormArray.controls.map(c => c.value.authorId),
    imageUrl: this.imagePreviewUrl || null
  };
}
//update book
  updateBook(): void {
  if (this.bookForm.invalid || !this.bookIdToEdit) return;

  const payload = this.buildUpdatePayload();
  this.bookService.updateBook(payload).subscribe({
    next: () => {
      this.successMessage = 'Book updated successfully!';
      this.router.navigate(['/books']);
      this.formClosed.emit();
    },
    error: err => {
      this.errorMessage = 'Failed to update book';
      console.error(err);
    }
  });
}
// Build FormData for create
  private buildFormData(): FormData {
    const formData = new FormData();
    const value = this.bookForm.value;

    formData.append('title', value.title);
    formData.append('isbn', value.isbn);
    formData.append('yearPublished', value.yearPublished.toString());
    formData.append('price', value.price.toString());
    formData.append('stockQuantity', value.stockQuantity.toString());

    // Append authors
    this.authorsFormArray.controls.forEach(ctrl => {
      formData.append('AuthorIds', ctrl.value.authorId.toString());
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    return formData;
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    this.selectedFile = target.files[0];

    const reader = new FileReader();
    reader.onload = () => (this.imagePreviewUrl = reader.result);
    reader.readAsDataURL(this.selectedFile);
  }

  onCancel(): void {
    this.router.navigate(['/books']);
    this.bookForm.reset();
  }

  createAuthorFormGroup(authorId: number | null = null) {
    return this.fb.group({ authorId: [authorId, Validators.required] });
  }

  get authorsFormArray(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor(): void {
    this.authorsFormArray.push(this.createAuthorFormGroup());
  }

  removeAuthor(index: number): void {
    if (this.authorsFormArray.length > 1) {
      this.authorsFormArray.removeAt(index);
    }
  }
}
