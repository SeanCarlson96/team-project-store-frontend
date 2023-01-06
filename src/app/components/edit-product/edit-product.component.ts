import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { CategoryDTO } from 'src/DTOs/CategoryDTO';
import { ProductDTO } from 'src/DTOs/ProductDTO';
import { SaleDTO } from 'src/DTOs/SaleDTO';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public productToEdit = {} as ProductDTO
  public updatedProduct = {} as ProductDTO
  editProductId: number
  editProductProductName: string = ''
  editProductPrice: number = 0
  editProductSaleId: number | undefined
  editProductCategories: number[] = []
  editProductDescription: string = ''
  editProductDiscontinued: boolean = false
  editProductImage: string = ''
  editProductAvailableDate: Date = new Date
  editProductQuantity: number = 0
  editProductMinAdPrice: number = 0
  private selectedProductSubscription: Subscription
  editProductCategoryDTOArray: CategoryDTO[] = []
  catToAdd = {} as CategoryDTO
  editProductCategoryDTOProductDTOArray: ProductDTO[] = []
  prodToAdd = {} as ProductDTO
  tempSaleId: number = -1
  tempSaleId2: number = -1

  constructor(public ui: UiService) { 
    this.editProductId = this.ui.productIdToEdit
    //get product
    this.ui.getProductById(this.ui.productIdToEdit) //sets ui.selectedProduct to a Product type
    //set ngmodel variables to that product's information
    this.selectedProductSubscription = ui.whenSelectedProductUpdates().subscribe(product => {
        this.editProductId = product.id
        this.editProductProductName = product.productName
        this.editProductPrice = product.price
        this.editProductSaleId = product.sale?.id
        this.editProductCategories = []//product.categories
        this.editProductDescription = product.description
        this.editProductDiscontinued = product.discontinued
        this.editProductImage = product.image
        this.editProductAvailableDate = product.availableDate
        this.editProductQuantity = product.quantity
        this.editProductMinAdPrice = product.minAdPrice
    })
    
  }

  ngOnInit(): void {
  }

  updateProduct(): void {
    for(let catId of this.editProductCategories){
      for(let cat of this.ui.categories){
        if(catId === cat.id){
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
            this.editProductCategoryDTOProductDTOArray.push(this.prodToAdd)
          }
          this.catToAdd = {
            id: cat.id,
            categoryName: cat.categoryName,
            products: this.editProductCategoryDTOProductDTOArray
          }
          this.editProductCategoryDTOArray.push(this.catToAdd)
        }
      }
    }
    if(this.editProductSaleId){ this.tempSaleId2 = this.editProductSaleId }
    this.updatedProduct = {
      id: this.editProductId,
      productName: this.editProductProductName,
      price: this.editProductPrice,
      saleId: this.tempSaleId2,
      categories: this.editProductCategoryDTOArray,
      description: this.editProductDescription,
      discontinued: this.editProductDiscontinued,
      image: this.editProductImage,
      availableDate: this.editProductAvailableDate,
      quantity: this.editProductQuantity,
      minAdPrice: this.editProductMinAdPrice,
    }
    this.ui.editProduct(this.updatedProduct)
  }
}
