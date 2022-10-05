import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponsPageComponent } from './admin-coupons-page.component';

describe('AdminCouponsPageComponent', () => {
  let component: AdminCouponsPageComponent;
  let fixture: ComponentFixture<AdminCouponsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCouponsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCouponsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
