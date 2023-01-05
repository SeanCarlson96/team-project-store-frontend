import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Coupon } from 'src/data/Coupon';

@Component({
  selector: 'app-shopkeeper-coupons',
  templateUrl: './shopkeeper-coupons.component.html',
  styleUrls: ['./shopkeeper-coupons.component.css']
})
export class ShopkeeperCouponsComponent implements OnInit {
  displayedColumns: string[] = ['delete','name', 'start', 'stop', 'percentage', 'limit', 'edit'];
  coupons: Coupon[] = [];
  dataSource: Coupon[] = [];
  couponSubscription: Subscription;

  constructor(public ui: UiService) {
    this.couponSubscription = this.ui.whenCouponsUpdates().subscribe(coupons => {
      this.coupons = coupons
      this.dataSource = this.coupons
    })
    this.ui.loadCoupons();
   }

  ngOnInit(): void {
  }

  onDeleteCoupon(id: number): void {
    if (id == null) return;
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.ui.deleteCoupon(id)
    }
  }

  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe()
  }

}
