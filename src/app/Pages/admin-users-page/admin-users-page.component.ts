import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {

  users:any;

  constructor(private dataService:DataService) {
    dataService.getAllUsers().subscribe((response:any)=>{
      this.users=response;
    })
   }

  ngOnInit(): void {
  }

  activate(id:any){
    this.dataService.activateUser(id).subscribe(()=>{
      window.location.reload();
    });
  }

  deactivate(id:any){
    this.dataService.deactivateUser(id).subscribe(()=>{
      window.location.reload();
    });
  }

}
