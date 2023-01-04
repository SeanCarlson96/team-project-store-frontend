import { Component, OnInit } from '@angular/core';
import { Category } from 'src/data/Category';
import { Product } from 'src/data/Product';
import { Sale } from 'src/data/Sale';
import { UiService } from 'src/app/services/ui.service';
import { ProductDTO } from 'src/DTOs/ProductDTO';
import { CategoryDTO } from 'src/DTOs/CategoryDTO';
import { SaleDTO } from 'src/DTOs/SaleDTO';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  public newProduct = {} as ProductDTO
  newProductProductName: string = ''
  newProductPrice: number = 0
  newProductSaleId: number = 0
  newProductCategories: CategoryDTO[] = []
  newProductDescription: string = ''
  newProductDiscontinued: boolean = false
  newProductImage: string = ''
  newProductAvailableDate: Date = new Date
  newProductQuantity: number = 0
  newProductMinAdPrice: number = 0

  constructor(public ui: UiService) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    console.log(this.newProductCategories)
    this.newProduct = {
      id: null,
      productName: this.newProductProductName,
      price: this.newProductPrice,
      saleId: this.newProductSaleId,
      categories: this.newProductCategories,
      description: this.newProductDescription,
      discontinued: this.newProductDiscontinued,
      image: this.newProductImage,
      availableDate: this.newProductAvailableDate,
      quantity: this.newProductQuantity,
      minAdPrice: this.newProductMinAdPrice,
    }
    this.ui.addProduct(this.newProduct)
  }

}
