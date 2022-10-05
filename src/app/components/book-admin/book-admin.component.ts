import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-book-admin',
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.css']
})
export class BookAdminComponent implements OnInit {

  books:any;
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

  constructor(private dataService:DataService, private fb:FormBuilder, private datePipe:DatePipe) {
    dataService.getAllBooks().subscribe((response)=>{
      this.books = response;
    })
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

}
