import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Product } from 'src/data/Product';
import { CartDTO } from 'src/DTOs/CartDTO';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'productName', 'quantity', 'pricePerItem', 'totalPrice']
  public dataSource: Product[] = []

  constructor(public ui: UiService) { }

  public showMe(): void {
    console.log(this.ui.selectedProduct.productName)
    console.log(this.ui.currentCart.products[0].quantity)
    console.log(this.ui.selectedProduct.price)
    console.log(this.ui.selectedProduct.price*this.ui.currentCart.products[0].quantity)
  }
  ngOnInit(): void {
  }

}
