import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Product } from 'src/data/Product';

@Component({
  selector: 'app-shopkeeper-products',
  templateUrl: './shopkeeper-products.component.html',
  styleUrls: ['./shopkeeper-products.component.css']
})
export class ShopkeeperProductsComponent implements OnInit, OnDestroy {

  ui: UiService
  public newProduct: boolean = false
  public editProduct: number = -1
  public displayedColumns: string[] = ['Delete', 'Edit', 'productName', 'Price', 'Quantity'];
  public dataSource: Product[] = []
  private productsSubscription: Subscription

  constructor(ui:UiService){
    this.ui = ui
    ui.getProducts()
    this.productsSubscription = ui.whenProductsUpdates().subscribe(products => {
      this.dataSource = products
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
  }

  openProductEdit(id: number) {
    this.ui.productIdToEdit = id
    this.editProduct = id
  }

}
