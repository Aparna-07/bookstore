import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-coupon-admin',
  templateUrl: './coupon-admin.component.html',
  styleUrls: ['./coupon-admin.component.css']
})
export class CouponAdminComponent implements OnInit {

  coupons:any;
  myCouponEditForm = this.fb.group({
    Code:[,[Validators.required]],
    Description:[],
    Discount:[,[Validators.required]],
    MinimumSpend:[,[Validators.required]],
    Expiry:[,[Validators.required]]
  });

  myCouponAddForm = this.fb.group({
    Code:[,[Validators.required]],
    Description:[],
    Discount:[,[Validators.required]],
    MinimumSpend:[,[Validators.required]],
    Expiry:[,[Validators.required]]
  });

  constructor(private dataService:DataService, private fb:FormBuilder, private datePipe:DatePipe) {
    dataService.getAllCoupons().subscribe((response)=>{
      this.coupons = response;
    })
   }

   editFormClicked(coupon:any){
    this.myCouponEditForm.controls.Code.setValue(coupon.Code);
    this.myCouponEditForm.controls.Description.setValue(coupon.Description);
    this.myCouponEditForm.controls.MinimumSpend.setValue(coupon.MinimumSpend);
    this.myCouponEditForm.controls.Discount.setValue(coupon.Discount);
    this.myCouponEditForm.controls.Expiry.setValue(this.datePipe.transform(coupon.Expiry, 'yyyy-MM-dd') as any);
   }

  ngOnInit(): void {
  }

  editCoupon(){
    this.dataService.updateCoupon(this.myCouponEditForm.value).subscribe((response)=>{
      window.location.reload();
    });
  }

  addCoupon(){
    this.dataService.insertCoupon(this.myCouponAddForm.value).subscribe((response)=>{
      window.location.reload();
    });
  }

  deleteCoupon(code:any){
    this.dataService.deleteCoupon(code.trim()).subscribe((response)=>{
      window.location.reload();
    });
  }
}
