import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAuthorsByBookCountComponent } from './top-authors-by-book-count-component';

describe('TopAuthorsByBookCountComponent', () => {
  let component: TopAuthorsByBookCountComponent;
  let fixture: ComponentFixture<TopAuthorsByBookCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAuthorsByBookCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAuthorsByBookCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
