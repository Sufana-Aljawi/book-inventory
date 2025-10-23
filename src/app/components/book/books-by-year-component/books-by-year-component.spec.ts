import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksByYearComponent } from './books-by-year-component';

describe('BooksByYearComponent', () => {
  let component: BooksByYearComponent;
  let fixture: ComponentFixture<BooksByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksByYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
