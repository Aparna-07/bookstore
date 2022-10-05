import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cat-admin',
  templateUrl: './cat-admin.component.html',
  styleUrls: ['./cat-admin.component.css']
})
export class CatAdminComponent implements OnInit {

  categories:any;
  mySearchForm = this.fb.group({
    search:[,[Validators.required]]
  });

  myCatForm = this.fb.group({
    CategoryId:[, [Validators.required]],
    CategoryName:[, [Validators.required]],
    Description:[],
    Image:[, [Validators.required]],
    Status:[, [Validators.required]],
    Position:[, [Validators.required]],
    CreatedAt:[]
  });

  myCatAddForm = this.fb.group({
    CategoryId:[0],
    CategoryName:[, [Validators.required]],
    Description:[],
    Image:[, [Validators.required]],
    Status:[, [Validators.required]],
    Position:[, [Validators.required]],
    CreatedAt:[this.datePipe.transform(new Date(), 'yyyy-MM-dd')]
  });

  constructor(private dataService:DataService, private fb:FormBuilder, private datePipe:DatePipe) {
    dataService.getAllCategories().subscribe((response)=>{
      this.categories = response;
    })
   }

   editFormClicked(cat:any){
    this.myCatForm.controls.CategoryId.setValue(cat.CategoryId);
    this.myCatForm.controls.CategoryName.setValue(cat.CategoryName);
    this.myCatForm.controls.Description.setValue(cat.Description);
    this.myCatForm.controls.Image.setValue(cat.Image);
    this.myCatForm.controls.Status.setValue(cat.Status);
    this.myCatForm.controls.Position.setValue(cat.Position);
    if(cat.CreatedAt)
      this.myCatForm.controls.CreatedAt.setValue(this.datePipe.transform(cat.CreatedAt, 'yyyy-MM-dd') as any);
   }

  ngOnInit(): void {
  }

  editCat(){
    this.dataService.updateCategory(this.myCatForm.value).subscribe((response)=>{
      window.location.reload();
    });
  }

  addCat(){
    this.dataService.insertCategory(this.myCatAddForm.value).subscribe((response)=>{
      window.location.reload();
    });
  }

  deleteCat(id:any){
    this.dataService.deleteCategory(id).subscribe((response)=>{
      window.location.reload();
    });
  }

  searchSubmit(){
    this.dataService.getCategoryByName(this.mySearchForm.value.search).subscribe((response:any)=>{
      this.categories = [response];
    })
  }
}
