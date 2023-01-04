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
  editProductCategories: CategoryDTO[] = []
  editProductDescription: string = ''
  editProductDiscontinued: boolean = false
  editProductImage: string = ''
  editProductAvailableDate: Date = new Date
  editProductQuantity: number = 0
  editProductMinAdPrice: number = 0
  private selectedProductSubscription: Subscription

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
    this.updatedProduct = {
      id: this.editProductId,
      productName: this.editProductProductName,
      price: this.editProductPrice,
      saleId: 1, //this.editProductSale,
      categories: this.editProductCategories,
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
