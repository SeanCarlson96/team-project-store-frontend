import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperCouponsComponent } from './shopkeeper-coupons.component';

describe('ShopkeeperCouponsComponent', () => {
  let component: ShopkeeperCouponsComponent;
  let fixture: ComponentFixture<ShopkeeperCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopkeeperCouponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeeperCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
