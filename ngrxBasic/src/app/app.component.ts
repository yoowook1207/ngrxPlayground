import { Component } from '@angular/core';
import { GoogleBooksService } from './state/books.service';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions, BooksApiActions } from './state/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  constructor(private bookService: GoogleBooksService, private store: Store) {}

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) =>
    this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
    )
  }
}
