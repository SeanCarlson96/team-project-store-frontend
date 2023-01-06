import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Coupon } from 'src/data/Coupon';
import { CouponDTO } from 'src/DTOs/CouponDTO';

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
  couponObject: CouponDTO = {} as CouponDTO;


  newCoupon: boolean = false;
  public editCategoryId: number = -1;
  edit: boolean = false;
  add: boolean = false;

  // ADDING NGMODEL
  addCouponName: string = '';
  startDate: Date = new Date();
  stopDate: Date = new Date();
  useLimit: number = 0;
  percentage: number = 0;
  
  // EDITING NGMODEL
  editCouponName: string = '';
  editStartDate: Date = new Date();
  editStopDate: Date = new Date();
  editUseLimit: number = 0;
  editPercentage: number = 0;


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

  addCoupon(): void {
    if (this.addCouponName == '' || this.useLimit <= 0 ) {
      this.ui.openSnackBar('Can\'t have empty fields!','Close');
      return;
    }
    if (this.startDate > this.stopDate ) {
      this.ui.openSnackBar('Start date can\'t be after stop date!','Close');
      return;
    }
    if (this.percentage > .999) {
      this.ui.openSnackBar('Percentage can\'t be more than 100%','Close');
      return;
    }
    const newCoupon: CouponDTO ={
      id: null,
      couponName: this.addCouponName,
      startDate: this.startDate,
      stopDate: this.stopDate,
      useLimit: this.useLimit,
      percentage: this.percentage,
      userId: null
    }
    this.ui.addCoupon(newCoupon);
    this.add = false;
    this.newCoupon = false;
    this.clearFields();
  }

  clearFields(): void {
    this.addCouponName = '';
    this.startDate = new Date();
    this.stopDate = new Date();
    this.useLimit = 0;
    this.percentage = 0;
  }

  //PRECONDITION_FAILED
  updateCoupon(): void {
  //   if (this.editCouponName == '' || this.editUseLimit <= 0 ) {
  //     this.ui.openSnackBar('Can\'t have empty fields!','Close');
  //     return;
  //   }
  //   if (this.editStartDate > this.editStopDate ) {
  //     this.ui.openSnackBar('Start date can\'t be after stop date!','Close');
  //     return;
  //   }
  //   if (this.editPercentage > .999) {
  //     this.ui.openSnackBar('Percentage can\'t be more than 100%','Close');
  //     return;
  //   }
  //   const newCoupon: CouponDTO ={
  //     id: this.couponObject.id,
  //     couponName: this.editCouponName,
  //     startDate: this.editStartDate,
  //     stopDate: this.editStopDate,
  //     useLimit: this.editUseLimit,
  //     percentage: this.editPercentage,
  //     userId: null
  //   }
  //    this.ui.editCoupon(newCoupon);
  //   console.log('Put object being sent from shopkeeper',newCoupon);
  //   this.edit = false;
  //   this.clearFields();
  }

  public getCoupon(coupon: CouponDTO){
    this.couponObject = coupon;
  }

  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe()
  }

}
