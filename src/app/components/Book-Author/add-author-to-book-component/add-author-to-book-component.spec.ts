import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorToBookComponent } from './add-author-to-book-component';

describe('AddAuthorToBookComponent', () => {
  let component: AddAuthorToBookComponent;
  let fixture: ComponentFixture<AddAuthorToBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAuthorToBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuthorToBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
