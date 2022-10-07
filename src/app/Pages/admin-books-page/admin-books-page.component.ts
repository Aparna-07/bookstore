import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-books-page',
  templateUrl: './admin-books-page.component.html',
  styleUrls: ['./admin-books-page.component.css']
})
export class AdminBooksPageComponent implements OnInit {
  books:any;
  allBooks:any;

  mySearchForm = this.fb.group({
    search: [, [Validators.required]]
  });

  myBookEditForm = this.fb.group({
    BookId:[, [Validators.required]],
    CategoryId:[, [Validators.required]],
    Title:[, [Validators.required]],
    Author:[, [Validators.required]],
    ISBN:[, [Validators.required]],
    Year:[],
    Price:[, [Validators.required]],
    Description:[],
    Position:[, [Validators.required]],
    Status:[, [Validators.required]],
    Image:[, [Validators.required]],
  });

  myBookAddForm = this.fb.group({
    BookId:[0],
    CategoryId:[, [Validators.required]],
    Title:[, [Validators.required]],
    Author:[, [Validators.required]],
    ISBN:[, [Validators.required]],
    Year:[],
    Price:[, [Validators.required]],
    Description:[],
    Position:[, [Validators.required]],
    Status:[, [Validators.required]],
    Image:[, [Validators.required]],
  });

  constructor(private dataService:DataService, private fb:FormBuilder, private datePipe:DatePipe, private activatedRoute: ActivatedRoute) {

    dataService.getAllBooks().subscribe((response)=>{
      this.books = response;
      this.allBooks = response;
    });

    let id = activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      dataService.getBookByCatId(id as unknown as number).subscribe((response: any) => {
        this.books = response;
      });
    }
   }

   editFormClicked(book:any){
    this.myBookEditForm.controls.BookId.setValue(book.BookId);
    this.myBookEditForm.controls.CategoryId.setValue(book.CategoryId);
    this.myBookEditForm.controls.Title.setValue(book.Title);
    this.myBookEditForm.controls.Author.setValue(book.Author);
    this.myBookEditForm.controls.ISBN.setValue(book.ISBN);
    this.myBookEditForm.controls.Year.setValue(book.Year);
    this.myBookEditForm.controls.Price.setValue(book.Price);
    this.myBookEditForm.controls.Description.setValue(book.Description);
    this.myBookEditForm.controls.Position.setValue(book.Position);
    this.myBookEditForm.controls.Status.setValue(book.Status);
    this.myBookEditForm.controls.Image.setValue(book.Image);
   }

  ngOnInit(): void {
  }

  editBook(){
    this.dataService.updateBook(this.myBookEditForm.value).subscribe((response)=>{
      window.location.reload();
    });
  }

  addBook(){
    this.dataService.insertBook(this.myBookAddForm.value).subscribe((response)=>{
      window.location.reload();
    });
  }

  deleteBook(id:any){
    this.dataService.deleteBook(id).subscribe((response)=>{
      window.location.reload();
    });
  }

  searchSubmit() {
    if (this.mySearchForm.value.search) {
      this.dataService.getBookBySearch('Title', this.mySearchForm.value.search)?.subscribe((response: any) => {
        this.books = response;
      });
    }
    else {
      this.books = this.allBooks;
    }
  }

}
