import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Cart } from 'src/data/Cart';
import { Product } from 'src/data/Product';
import { ProductInCart } from 'src/data/ProductsInCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public displayedColumns: string[] = ['delete', 'productName', 'quantity', 'pricePerItem', 'totalPrice']
  public dataSource: ProductInCart[] = []
  private productsInCartSubscription: Subscription

  constructor(public ui: UiService) {
    this.productsInCartSubscription = ui.loadShowCurrentProductsInCart().subscribe(productsInCart => {
      this.dataSource = productsInCart
    })
  }

  
  ngOnInit(): void {
    // this.dataSource = this.ui.loadShowCurrentProductsInCart();
  }

}
