import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  public quantityInCart = 0

  constructor(public ui: UiService) { }

  public quantityPlusOne(): void {
    this.quantityInCart += 1
    this.ui.selectedProduct.quantity -= 1
  }
  public quantityMinusOne(): void {
    if(this.quantityInCart > 0){
      this.quantityInCart -= 1
      this.ui.selectedProduct.quantity += 1
    }
  }

  ngOnInit(): void {
  }

}
