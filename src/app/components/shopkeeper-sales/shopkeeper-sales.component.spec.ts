import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperSalesComponent } from './shopkeeper-sales.component';

describe('ShopkeeperSalesComponent', () => {
  let component: ShopkeeperSalesComponent;
  let fixture: ComponentFixture<ShopkeeperSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopkeeperSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeeperSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
