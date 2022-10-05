import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any;
  allBooks: any;
  categories: any;
  badge = new Map();
  totalBadge: number = 0;
  selectedCat: any = -1;
  booksByCat = new Map();

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.dataService.getAllBooks().subscribe((response: any) => {
      if (response != null) {
        this.books = response;
        this.allBooks = response;
      }
    });

    this.dataService.getAllCategories().subscribe((response: any) => {
      if (response != null) {
        this.categories = response;
        for (let i = 0; i < this.categories.length; i++) {
          this.dataService.getBookByCatId(this.categories[i].CategoryId).subscribe((response: any) => {
            if (response != null) {
              this.booksByCat.set(this.categories[i].CategoryId, response);
              this.badge.set(this.categories[i].CategoryId, response.length);
              this.totalBadge += response.length;
            }
          });
        }
      }
    });
  }

  catSelected(i: any) {
    this.selectedCat = i;
    if (i == -1) {
      this.books = this.allBooks;
    }
    else {
      let catId = this.categories[i].CategoryId;
      this.books = this.booksByCat.get(catId);
    }
  }

  mySearchForm = this.fb.group(
    {
      searchBy: ["Title", [Validators.required]],
      search: [null, [Validators.required]]
    }
  );

  ngOnInit(): void {
  }

  searchSubmit() {
    console.log(this.mySearchForm.value);
    this.dataService.getBookBySearch(this.mySearchForm.value.searchBy, this.mySearchForm.value.search)?.subscribe((response: any) => {
      this.selectedCat = -2;
      if (this.mySearchForm.value.searchBy == "Title" || this.mySearchForm.value.searchBy == "ISBN")
        this.books = [response];
      else {
        this.books = response;
      }
    });
  }
}
