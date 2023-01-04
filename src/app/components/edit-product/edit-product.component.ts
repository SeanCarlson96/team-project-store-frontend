import { Component, OnInit } from '@angular/core';
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
  editProductProductName: string
  editProductPrice: number
  editProductSaleId: number | undefined
  editProductCategories: CategoryDTO[]
  editProductDescription: string
  editProductDiscontinued: boolean
  editProductImage: string
  editProductAvailableDate: Date
  editProductQuantity: number
  editProductMinAdPrice: number

  constructor(public ui: UiService) { 
    this.editProductId = this.ui.productIdToEdit
    //get product
    this.ui.getProductById(this.ui.productIdToEdit) //sets ui.selectedProduct to a Product type
    console.log(this.ui.selectedProduct)
    //set ngmodel variables to that product's information
    this.editProductId = this.ui.selectedProduct.id
    this.editProductProductName = this.ui.selectedProduct.productName
    this.editProductPrice = this.ui.selectedProduct.price
    this.editProductSaleId = this.ui.selectedProduct.sale?.id
    this.editProductCategories = [] //this.ui.selectedProduct.categories
    this.editProductDescription = this.ui.selectedProduct.description
    this.editProductDiscontinued = this.ui.selectedProduct.discontinued
    this.editProductImage = this.ui.selectedProduct.image
    this.editProductAvailableDate = this.ui.selectedProduct.availableDate
    this.editProductQuantity = this.ui.selectedProduct.quantity
    this.editProductMinAdPrice = this.ui.selectedProduct.minAdPrice
    console.log(this.editProductProductName)
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
