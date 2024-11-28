import { Component, OnInit } from '@angular/core';
import { Book } from '../../book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',
})
export class AllBooksComponent implements OnInit {
  books: Book[] = [];
  showForm: boolean = false;
  formGroup!: FormGroup;

  constructor(private bookService: BookService) {
    this.formGroup = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      title: new FormControl(''),
      price: new FormControl(''),
      hauter: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.bookService.getAll().subscribe((next) => {
      this.books = next;
    });
  }

  public delete(id: number) {
    this.bookService.delete(id).subscribe((next) => {
      this.getAll();
    });
  }

  public showFormUpdate(book: Book) {
    this.showForm = true;
    this.formGroup.setValue({
      id: book.id,
      title: book.title,
      price: book.price,
      hauter: book.hauter,
    });
  }

  public update() {
    console.log(this.formGroup.value);
    this.bookService.update(this.formGroup.getRawValue()).subscribe((next) => {
      this.getAll();
      this.showForm = false;
    });
  }
}
