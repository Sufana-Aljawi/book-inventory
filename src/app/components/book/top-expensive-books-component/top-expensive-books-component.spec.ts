import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopExpensiveBooksComponent } from './top-expensive-books-component';

describe('TopExpensiveBooksComponent', () => {
  let component: TopExpensiveBooksComponent;
  let fixture: ComponentFixture<TopExpensiveBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopExpensiveBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopExpensiveBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
