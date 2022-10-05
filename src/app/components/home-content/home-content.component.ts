import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  categories:any[]=[];
  featuredBooks:any[]=[];

  constructor(private dataService:DataService, private router:Router) { 
    this.dataService.getAllCategories().subscribe((response:any)=>{
      if(response != null){
        this.categories = response;
      }
    });

    this.dataService.getFeaturedBooks().subscribe((response:any)=>{
      if(response != null){
        this.featuredBooks = response;
      }
    });
  }

  ngOnInit(): void {
  }

}
