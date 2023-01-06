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
  newProductCategories: number[] = []
  newProductDescription: string = ''
  newProductDiscontinued: boolean = false
  newProductImage: string = ''
  newProductAvailableDate: Date = new Date
  newProductQuantity: number = 0
  newProductMinAdPrice: number = 0
  newProductCategoryDTOArray: CategoryDTO[] = []
  catToAdd = {} as CategoryDTO
  newProductCategoryDTOProductDTOArray: ProductDTO[] = []
  prodToAdd = {} as ProductDTO
  tempSaleId: number = 0

  constructor(public ui: UiService) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    //loop through this.newProductCategories and create CategoryDTO for each.
    for(let catId of this.newProductCategories){
      for(let cat of this.ui.categories){
        if(catId === cat.id){
          //loop through products and create ProductDTO for each
          for(let prod of cat.products){
            if(prod.sale?.id){ this.tempSaleId = prod.sale?.id }
            this.prodToAdd = {
              id: prod.id,
              productName: prod.productName,
              price: prod.price,
              saleId: this.tempSaleId,
              categories: [],
              description: prod.description,
              discontinued: prod.discontinued,
              image: prod.image,
              availableDate: prod.availableDate,
              quantity: prod.quantity,
              minAdPrice: prod.minAdPrice
            }
            this.newProductCategoryDTOProductDTOArray.push(this.prodToAdd)
          }
          this.catToAdd = {
            id: cat.id,
            categoryName: cat.categoryName,
            products: this.newProductCategoryDTOProductDTOArray
          }
          //Push that categoryDTO into new array
          this.newProductCategoryDTOArray.push(this.catToAdd)
        }
      }
    }
    
    this.newProduct = {
      id: null,
      productName: this.newProductProductName,
      price: this.newProductPrice,
      saleId: this.newProductSaleId,
      categories: this.newProductCategoryDTOArray,
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
