import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperCategoriesComponent } from './shopkeeper-categories.component';

describe('ShopkeeperCategoriesComponent', () => {
  let component: ShopkeeperCategoriesComponent;
  let fixture: ComponentFixture<ShopkeeperCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopkeeperCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeeperCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
