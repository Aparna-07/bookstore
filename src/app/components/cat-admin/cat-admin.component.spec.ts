import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatAdminComponent } from './cat-admin.component';

describe('CatAdminComponent', () => {
  let component: CatAdminComponent;
  let fixture: ComponentFixture<CatAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
