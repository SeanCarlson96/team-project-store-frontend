import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Sale } from 'src/data/Sale';
import { ProductDTO } from 'src/DTOs/ProductDTO';
import { SaleDTO } from 'src/DTOs/SaleDTO';

@Component({
  selector: 'app-shopkeeper-sales',
  templateUrl: './shopkeeper-sales.component.html',
  styleUrls: ['./shopkeeper-sales.component.css']
})
export class ShopkeeperSalesComponent implements OnInit, OnDestroy {
  ui: UiService
  public newSale: boolean = false
  //public editSale: number = -1
  public editSaleId: number = -1
  public displayedColumns: string[] = ['Delete', 'Edit', 'saleName', 'startDate', 'stopDate', 'discountPercentage']; //'products',
  public dataSource: Sale[] = []
  private salesSubscription: Subscription
  public edit: boolean = false
  public newSaleSaleName: string = ''
  public newSaleStartDate: Date = new Date
  public newSaleStopDate: Date = new Date
  public newSaleProducts: number[] = []
  public newSaleDiscountPercentage: number = 0
  public newSaleDTO = {} as SaleDTO
  public updatedSale = {} as SaleDTO
  public salesProducts = {} as ProductDTO
  public newSaleProductDTOArray: ProductDTO[] = []
  public productDTOToAdd = {} as ProductDTO
  tempSaleId: number = 0
  tempSaleId2: number = 0

  constructor(ui:UiService){
    this.ui = ui
    ui.loadSales()
    this.salesSubscription = ui.whenSalesUpdates().subscribe(sales => {
      this.dataSource = sales
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.salesSubscription.unsubscribe()
  }
  addNewSale() {
    for(let productId of this.newSaleProducts){
      for(let product of this.ui.products){
        if(productId === product.id){
          if(product.sale?.id){ this.tempSaleId = product.sale?.id }
          this.productDTOToAdd = {
            id: product.id,
            productName: product.productName,
            price: product.price,
            saleId: this.tempSaleId,
            categories: [],
            description: product.description,
            discontinued: product.discontinued,
            image: product.image,
            availableDate: product.availableDate,
            quantity: product.quantity,
            minAdPrice: product.minAdPrice
          }
          this.newSaleProductDTOArray.push(this.productDTOToAdd)
        }
      }
    }
    this.newSaleDTO = {
      id: null,
      saleName: this.newSaleSaleName,
      startDate: this.newSaleStartDate,
      stopDate: this.newSaleStopDate,
      products: this.newSaleProductDTOArray, //of type ProductDTO[]
      discountPercentage: this.newSaleDiscountPercentage
    }
    console.log(this.newSaleDTO)
    this.ui.addSale(this.newSaleDTO)
    this.newSale = false
  }
  openEditSale(id: number) {
    this.ui.saleIdToEdit = id
    this.editSaleId = id
    this.edit = true;
    for(let sale of this.dataSource){
      if(sale.id === id){
        this.newSaleSaleName = sale.saleName
      }
    }
  }
  updateSale(): void {
    for(let productId of this.newSaleProducts){
      for(let product of this.ui.products){
        if(productId === product.id){
          if(product.sale?.id){ this.tempSaleId2 = product.sale?.id }
          this.productDTOToAdd = {
            id: product.id,
            productName: product.productName,
            price: product.price,
            saleId: this.tempSaleId2,
            categories: [],
            description: product.description,
            discontinued: product.discontinued,
            image: product.image,
            availableDate: product.availableDate,
            quantity: product.quantity,
            minAdPrice: product.minAdPrice
          }
          this.newSaleProductDTOArray.push(this.productDTOToAdd)
        }
      }
    }
    this.updatedSale = {
      id: this.editSaleId,
      saleName: this.newSaleSaleName,
      startDate: this.newSaleStartDate,
      stopDate: this.newSaleStopDate,
      products: this.newSaleProductDTOArray, //of type ProductDTO
      discountPercentage: this.newSaleDiscountPercentage
    }
    this.ui.editSale(this.updatedSale)
    this.edit=false
    this.editSaleId=-1
    this.newSaleSaleName = ''
  }
}
